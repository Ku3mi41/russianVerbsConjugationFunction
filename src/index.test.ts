import { conjugate } from "./index";

describe("tests", () => {
  test("делать", () => {
    expect(conjugate("делать", "я")).toBe("делаю");
  });

  test("держать", () => {
    expect(conjugate("держать", "они")).toBe("держат");
    expect(conjugate("держать", "я")).toBe("держу");
  });

  test("пить", () => {
    expect(conjugate("пить", "я")).toBe("пью");
    expect(conjugate("пить", "они")).toBe("пьют");
  });

  test("веять", () => {
    expect(conjugate("веять", "ты")).toBe("веешь");
  });

  test("прыгать", () => {
    expect(conjugate("прыгать", "я")).toBe("прыгаю");
  });

  test("бродить", () => {
    expect(conjugate("бродить", "я")).toBe("брожу");
  });

  test("сохнуть", () => {
    expect(conjugate("сохнуть", "мы")).toBe("сохнем");
  });

  test("думать", () => {
    expect(conjugate("думать", "он")).toBe("думает");
  });

  test("слышать", () => {
    expect(conjugate("слышать", "вы")).toBe("слышите");
  });

  test("разрабатывать", () => {
    expect(conjugate("разрабатывать", "вы")).toBe("разрабатываете");
  });

  test("программировать", () => {
    expect(conjugate("программировать", "они")).toBe("программируют");
    expect(conjugate("программировать", "я")).toBe("программирую");
  });

  test("просчитывать", () => {
    expect(conjugate("просчитывать", "она")).toBe("просчитывает");
  });

  test("предугадывать", () => {
    expect(conjugate("предугадывать", "вы")).toBe("предугадываете");
  });

  test("спать", () => {
    expect(conjugate("спать", "ты")).toBe("спишь");
  });

  test("сдать", () => {
    expect(conjugate("сдать", "я")).toBe("сдаю");
  });

  test("петь", () => {
    expect(conjugate("петь", "я")).toBe("пою");
    expect(conjugate("петь", "вы")).toBe("поете");
    expect(conjugate("петь", "мы")).toBe("поем");
  });

  test("готовить", () => {
    expect(conjugate("готовить", "я")).toBe("готовлю");
  });

  test("давать", () => {
    expect(conjugate("давать", "я")).toBe("даю");
  });

  test("ждать", () => {
    expect(conjugate("ждать", "я")).toBe("жду");
  });

  test("рыть", () => {
    expect(conjugate("рыть", "я")).toBe("рою");
    expect(conjugate("рыть", "вы")).toBe("роете");
  });

  test("лежать", () => {
    expect(conjugate("лежать", "я")).toBe("лежу");
  });

  test("колоть", () => {
    expect(conjugate("колоть", "я")).toBe("колю");
  });

  test("ходить", () => {
    expect(conjugate("ходить", "я")).toBe("хожу");
    expect(conjugate("ходить", "вы")).toBe("ходите");
  });

  test("любить", () => {
    expect(conjugate("любить", "я")).toBe("люблю");
    expect(conjugate("любить", "мы")).toBe("любим");
  });

  test("водить", () => {
    expect(conjugate("водить", "я")).toBe("вожу");
    expect(conjugate("водить", "они")).toBe("водят");
  });

  test("брить", () => {
    expect(conjugate("брить", "я")).toBe("брею");
    expect(conjugate("брить", "они")).toBe("бреют");
  });

  test("стелить", () => {
    expect(conjugate("стелить", "я")).toBe("стелю");
    expect(conjugate("стелить", "они")).toBe("стелют");
  });

  test("писать", () => {
    expect(conjugate("писать", "я")).toBe("пишу");
    expect(conjugate("писать", "вы")).toBe("пишете");
  });

  test("тереть", () => {
    expect(conjugate("тереть", "я")).toBe("тру");
    expect(conjugate("тереть", "вы")).toBe("трете");
    expect(conjugate("тереть", "мы")).toBe("трем");
  });
});
