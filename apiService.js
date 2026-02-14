
export async function fetchStates() {
  const data = await import("../data/states.json");
  return data.default;
}

export async function fetchCases() {
  const data = await import("../data/cases.json");
  return data.default;
}
