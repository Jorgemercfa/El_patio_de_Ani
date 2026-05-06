import companiesSeed from '@/data/company';

const STORAGE_KEY = 'al-toque-companies';

/**
 * Obtener empresas del localStorage
 */
export function getCompanies() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(companiesSeed));
      return [...companiesSeed];
    }

    const parsed = JSON.parse(data);

    if (Array.isArray(parsed)) return parsed;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(companiesSeed));
    return [...companiesSeed];
  } catch (error) {
    console.warn('Error leyendo empresas:', error);
    return [];
  }
}

/**
 * Guardar empresas
 */
export function saveCompanies(companies) {
  if (!Array.isArray(companies)) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
}

function nextCompanyId(companies) {
  const maxId = companies.reduce(
    (max, company) => (company?.id > max ? company.id : max),
    0,
  );

  return maxId + 1;
}

/**
 * Registrar nueva empresa
 */
export function addCompany(companyInput) {
  const companies = getCompanies();

  const normalizedemail = (companyInput?.email || '').trim();

  if (!normalizedemail) {
    throw new Error('Debes ingresar un email válido.');
  }

  const exists = companies.some(
    (company) => (company?.email || '').trim() === normalizedemail,
  );

  if (exists) {
    throw new Error('Ya existe una empresa registrada con ese email.');
  }

  const company = {
    id: nextCompanyId(companies),
    name: companyInput?.name || '',
    email: normalizedemail,
    password: companyInput?.password || '',
  };

  companies.push(company);
  saveCompanies(companies);

  return company;
}
