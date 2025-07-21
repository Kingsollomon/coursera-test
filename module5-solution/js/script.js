(function (window) {
  "use strict";

  // STEP 0: placeholder for our random category short_name
  var randomCategoryShortName = "";

  // URLs for snippets & JSON data
  var homeHtmlUrl           = "snippets/home-snippet.html";
  var allCategoriesUrl      = "data/categories.json";
  var categoriesTitleHtml   = "snippets/categories-title-snippet.html";
  var categoryHtml          = "snippets/category-snippet.html";
  var menuItemsUrl          = "data/menu_items/";      // append <short_name>.json
  var menuItemsTitleHtml    = "snippets/menu-items-title.html";
  var menuItemHtml          = "snippets/menu-item.html";

  // Utility: inject HTML into the page
  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }

  // Utility: show loading icon
  function showLoading(selector) {
    var loader = "<div class='text-center'>" +
                   "<img src='images/ajax-loader.gif'>" +
                 "</div>";
    insertHtml(selector, loader);
  }

  // Utility: replace {{propName}} placeholders
  function insertProp(str, propName, propValue) {
    var placeholder = "{{" + propName + "}}";
    return str.replace(new RegExp(placeholder, "g"), propValue || "");
  }

  // Utility: toggle “active” class on nav items
  function switchMenuToActive(selector) {
    document
      .querySelectorAll(".nav .active")
      .forEach(function (el) { el.classList.remove("active"); });
    var item = document.querySelector(selector);
    if (item) item.classList.add("active");
  }

  // Our namespace
  var dc = {};

  // STEP 1 & 2: Load home view, fetch categories, pick one at random
  dc.loadHome = function () {
    showLoading("#main-content");

    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function (categories) {
        if (!categories || categories.length === 0) return;
        var idx = Math.floor(Math.random() * categories.length);
        randomCategoryShortName = categories[idx].short_name;

        // STEP 3: fetch home snippet & inject random short_name (wrapped in quotes)
        $ajaxUtils.sendGetRequest(
          homeHtmlUrl,
          function (homeHtml) {
            var finalHtml = homeHtml.replace(
              "{{randomCategoryShortName}}",
              "'" + randomCategoryShortName + "'"
            );
            insertHtml("#main-content", finalHtml);
          },
          false
        );
      },
      true
    );
  };

  // Unchanged: Load all menu categories
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
              html = insertProp(html, "name", cat.name);
              html = insertProp(html, "short_name", cat.short_name);
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

  // Unchanged: Load a single category’s menu items
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

                var pageTitle = menuItems.category.name;
                if (menuItems.category.special_instructions) {
                  pageTitle +=
                    " (" + menuItems.category.special_instructions + ")";
                }

                var finalHtml = insertProp(titleHtml, "name", pageTitle);
                finalHtml += "<section class='row'>";
                menuItems.menu_items.forEach(function (item) {
                  var html = itemHtml;
                  html = insertProp(html, "short_name", item.short_name);
                  html = insertProp(
                    html,
                    "catShortName",
                    menuItems.category.short_name
                  );
                  html = insertProp(html, "name", item.name);
                  html = insertProp(html, "description", item.description);
                  html = insertProp(html, "price_small", item.price_small);
                  html = insertProp(html, "price_large", item.price_large);
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

  // Expose $dc and initialize on DOMContentLoaded
  window.$dc = dc;
  document.addEventListener("DOMContentLoaded", dc.loadHome);
})(window);
