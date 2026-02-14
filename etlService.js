
import { fetchStates, fetchCases } from "./apiService";

export async function normalizeClimateData() {
  const states = await fetchStates();
  const cases = await fetchCases();

  // JOIN (states + cases)
  const joined = cases.map(c =>
    ({
      caseId: c.caseId,
      riskScore: c.riskScore,
      ...states.find(s => s.code === c.stateCode)
    })
  );

  // FILTER high risk
  const filtered = joined.filter(r => r.riskScore >= 8);

  // Transform (map)
  const normalized = filtered.map(r => ({
    id: r.caseId,
    state: r.name,
    code: r.code,
    risk: r.riskScore,
    severity: r.riskScore > 9 ? "Critical" : "High"
  }));

  return normalized;
}
