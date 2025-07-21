(function (window) {
  "use strict";

  // URLs for snippets and data
  var homeHtmlUrl           = "snippets/home-snippet.html";
  var allCategoriesUrl      = "data/categories.json";
  var categoriesTitleHtml   = "snippets/categories-title-snippet.html";
  var categoryHtml          = "snippets/category-snippet.html";
  var menuItemsUrl          = "data/menu_items/";
  var menuItemsTitleHtml    = "snippets/menu-items-title.html";
  var menuItemHtml          = "snippets/menu-item.html";

  // Utilities
  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }

  function showLoading(selector) {
    insertHtml(selector, "<div class='text-center'><img src='images/ajax-loader.gif'></div>");
  }

  function insertProperty(str, propName, propValue) {
    var placeholder = "{{" + propName + "}}";
    return str.replace(new RegExp(placeholder, "g"), propValue || "");
  }

  function switchMenuToActive(selector) {
    document.querySelectorAll(".nav .active")
            .forEach(function (el) { el.classList.remove("active"); });
    var active = document.querySelector(selector);
    if (active) active.classList.add("active");
  }

  // Namespace
  var dc = {};

  // Pick random category
  function chooseRandomCategory(categories) {
    var index = Math.floor(Math.random() * categories.length);
    return categories[index];
  }

  // Load home view and inject a random category short_name
  dc.loadHome = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML,
      true
    );
  };

  function buildAndShowHomeHTML(categories) {
    var chosen = chooseRandomCategory(categories);
    var shortNameQuoted = "'" + chosen.short_name + "'";

    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {
        var finalHtml = insertProperty(homeHtml, "randomCategoryShortName", shortNameQuoted);
        insertHtml("#main-content", finalHtml);
      },
      false
    );
  }

  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowCategoriesHTML,
      true
    );
  };

  function buildAndShowCategoriesHTML(categories) {
    $ajaxUtils.sendGetRequest(
      categoriesTitleHtml,
      function (titleHtml) {
        $ajaxUtils.sendGetRequest(
          categoryHtml,
          function (catHtml) {
            switchMenuToActive("#nav-categories");
            var finalHtml = titleHtml + "<section class='row'>";
            categories.forEach(function (cat) {
              var html = catHtml;
              html = insertProperty(html, "name", cat.name);
              html = insertProperty(html, "short_name", cat.short_name);
              finalHtml += html;
            });
            finalHtml += "</section>";
            insertHtml("#main-content", finalHtml);
          },
          false
        );
      },
      false
    );
  }

  dc.loadMenuItems = function (shortName) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      menuItemsUrl + shortName + ".json",
      function (menuItems) {
        $ajaxUtils.sendGetRequest(
          menuItemsTitleHtml,
          function (titleHtml) {
            $ajaxUtils.sendGetRequest(
              menuItemHtml,
              function (itemHtml) {
                switchMenuToActive("#nav-specials");

                var title = menuItems.category.name;
                if (menuItems.category.special_instructions) {
                  title += " (" + menuItems.category.special_instructions + ")";
                }

                var finalHtml = insertProperty(titleHtml, "name", title);
                finalHtml += "<section class='row'>";
                menuItems.menu_items.forEach(function (item) {
                  var html = itemHtml;
                  html = insertProperty(html, "short_name", item.short_name);
                  html = insertProperty(html, "catShortName", menuItems.category.short_name);
                  html = insertProperty(html, "name", item.name);
                  html = insertProperty(html, "description", item.description);
                  html = insertProperty(html, "price_small", item.price_small);
                  html = insertProperty(html, "price_large", item.price_large);
                  finalHtml += html;
                });
                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);
              },
              false
            );
          },
          false
        );
      },
      true
    );
  };

  window.$dc = dc;
  document.addEventListener("DOMContentLoaded", dc.loadHome);
})(window);
