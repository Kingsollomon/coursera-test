describe("Hello and Bye Speaker Modules", function() {

  it("should have helloSpeaker and byeSpeaker defined", function() {
    expect(window.helloSpeaker).toBeDefined();
    expect(window.byeSpeaker).toBeDefined();
  });

  it("helloSpeaker.speakSimple should return 'Hello Name'", function() {
    expect(helloSpeaker.speakSimple("Test")).toBe("Hello Test");
  });

  it("byeSpeaker.speakSimple should return 'Good Bye Name'", function() {
    expect(byeSpeaker.speakSimple("Test")).toBe("Good Bye Test");
  });

  it("helloSpeaker.speak should log to console", function() {
    spyOn(console, 'log');
    helloSpeaker.speak("World");
    expect(console.log).toHaveBeenCalledWith("Hello World");
  });

  it("byeSpeaker.speak should log to console", function() {
    spyOn(console, 'log');
    byeSpeaker.speak("World");
    expect(console.log).toHaveBeenCalledWith("Good Bye World");
  });

});
