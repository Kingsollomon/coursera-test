describe("script.js UI behavior", function() {

  it("creates 10 buttons in the hello & bye containers", function() {
    var helloBtns = document.querySelectorAll('#buttons-hello-container button');
    var byeBtns   = document.querySelectorAll('#buttons-bye-container button');
    expect(helloBtns.length + byeBtns.length).toBe(10);
  });

  it("clicking a hello button appends a green <p>", function() {
    var helloBtn = document.querySelector('#buttons-hello-container button');
    helloBtn.click();
    var ps = document.querySelectorAll('#greetings-container p.hello');
    expect(ps.length).toBe(1);
    expect(ps[0].textContent).toContain(helloBtn.textContent);
  });

  it("clicking a bye button appends a red <p>", function() {
    var byeBtn = document.querySelector('#buttons-bye-container button');
    byeBtn.click();
    var ps = document.querySelectorAll('#greetings-container p.bye');
    expect(ps.length).toBe(1);
    expect(ps[0].textContent).toContain(byeBtn.textContent);
  });

  it("clicking Clear Greetings empties the container", function() {
    // seed with two greetings
    document.querySelector('#buttons-hello-container button').click();
    document.querySelector('#buttons-bye-container button').click();
    expect(document.querySelectorAll('#greetings-container p').length).toBe(2);

    // now clear
    document.getElementById('clear-btn').click();
    expect(document.querySelectorAll('#greetings-container p').length).toBe(0);
  });

});
