const DEFAULT_MASTER_PASSWORD = 'K2009SA2701TOMUEL';
const OWNER_EMAIL = 'systemkratos27@gmail.com';
const OWNER_PASSWORD = 'S@muel-27-01-2009_';
const STORAGE_KEYS = {
  trustedDevices: 'ks_trusted_devices',
  users: 'ks_users',
  employees: 'ks_employees',
  products: 'ks_products',
  expenses: 'ks_expenses',
  sales: 'ks_sales',
  shifts: 'ks_shifts',
  currentUser: 'ks_current_user',
  currentShift: 'ks_current_shift',
  businessProfile: 'ks_business_profile',
  masterPassword: 'ks_master_password',
  masterPasswordEnabled: 'ks_master_password_enabled'
};

const appState = {
  currentUser: null,
  currentView: 'panel',
  currentShift: null,
  adminMode: true,
  authMode: 'login',
  pendingSale: null,
  ownerConsoleOpen: false
};

const isOwnerPage = window.location.pathname.toLowerCase().endsWith('owner.html');

const elements = {
  licenseGate: document.getElementById('licenseGate'),
  authScreen: document.getElementById('authScreen'),
  dashboardScreen: document.getElementById('dashboardScreen'),
  unlockBtn: document.getElementById('unlockBtn'),
  masterPasswordInput: document.getElementById('masterPasswordInput'),
  loginForm: document.getElementById('loginForm'),
  registerForm: document.getElementById('registerForm'),
  loginEmail: document.getElementById('loginEmail'),
  loginPassword: document.getElementById('loginPassword'),
  registerName: document.getElementById('registerName'),
  registerEmail: document.getElementById('registerEmail'),
  registerPassword: document.getElementById('registerPassword'),
  registerBusinessName: document.getElementById('registerBusinessName'),
  registerBusinessNit: document.getElementById('registerBusinessNit'),
  registerBusinessAddress: document.getElementById('registerBusinessAddress'),
  registerBusinessPhone: document.getElementById('registerBusinessPhone'),
  registerMasterPassword: document.getElementById('registerMasterPassword'),
  registerTerms: document.getElementById('registerTerms'),
  employeeDocumentInput: document.getElementById('employeeDocumentInput'),
  openCashBtn: document.getElementById('openCashBtn'),
  cashActivationPanel: document.getElementById('cashActivationPanel'),
  activateShiftDocument: document.getElementById('activateShiftDocument'),
  activateShiftBtn: document.getElementById('activateShiftBtn'),
  cashSaleBox: document.getElementById('cashSaleBox'),
  userPill: document.getElementById('userPill'),
  ownerConsoleBtn: document.getElementById('ownerConsoleBtn'),
  ownerConsoleScreen: document.getElementById('ownerConsoleScreen'),
  ownerCloseConsoleBtn: document.getElementById('ownerCloseConsoleBtn'),
  ownerTotalAccounts: document.getElementById('ownerTotalAccounts'),
  ownerActiveAccounts: document.getElementById('ownerActiveAccounts'),
  ownerMasterProtected: document.getElementById('ownerMasterProtected'),
  ownerAccountsList: document.getElementById('ownerAccountsList'),
  ownerCurrentMasterPassword: document.getElementById('ownerCurrentMasterPassword'),
  ownerNewMasterPassword: document.getElementById('ownerNewMasterPassword'),
  ownerConfirmMasterPassword: document.getElementById('ownerConfirmMasterPassword'),
  ownerMasterStatusToggle: document.getElementById('ownerMasterStatusToggle'),
  ownerMasterPasswordForm: document.getElementById('ownerMasterPasswordForm'),
  ownerBusinessNameInput: document.getElementById('ownerBusinessNameInput'),
  ownerBusinessPhoneInput: document.getElementById('ownerBusinessPhoneInput'),
  ownerThemeSelect: document.getElementById('ownerThemeSelect'),
  ownerSettingsForm: document.getElementById('ownerSettingsForm'),
  logoutBtn: document.getElementById('logoutBtn'),
  navItems: document.querySelectorAll('.nav-item'),
  views: document.querySelectorAll('.view-panel'),
  authTabs: document.querySelectorAll('.auth-tab'),
  cashStatusBox: document.getElementById('cashStatusBox'),
  saleProductCode: document.getElementById('saleProductCode'),
  saleQtyInput: document.getElementById('saleQtyInput'),
  addSaleBtn: document.getElementById('addSaleBtn'),
  cashTotal: document.getElementById('cashTotal'),
  turnSalesTotal: document.getElementById('turnSalesTotal'),
  turnCashTotal: document.getElementById('turnCashTotal'),
  turnTransferTotal: document.getElementById('turnTransferTotal'),
  closeCashBtn: document.getElementById('closeCashBtn'),
  receiptActions: document.getElementById('receiptActions'),
  printReceiptBtn: document.getElementById('printReceiptBtn'),
  salePreview: document.getElementById('salePreview'),
  paymentChoice: document.getElementById('paymentChoice'),
  registerSaleBtn: document.getElementById('registerSaleBtn'),
  inventoryForm: document.getElementById('inventoryForm'),
  inventoryTableBody: document.getElementById('inventoryTableBody'),
  expenseForm: document.getElementById('expenseForm'),
  expenseTableBody: document.getElementById('expenseTableBody'),
  employeeForm: document.getElementById('employeeForm'),
  employeeTableBody: document.getElementById('employeeTableBody'),
  expenseDonut: document.getElementById('expenseDonut'),
  expenseLegend: document.getElementById('expenseLegend'),
  cierreCajaTable: document.getElementById('cierreCajaTable'),
  employeeHistory: document.getElementById('employeeHistory'),
  ventasDia: document.getElementById('ventasDia'),
  ventasMes: document.getElementById('ventasMes'),
  utilidadBruta: document.getElementById('utilidadBruta'),
  utilidadNeta: document.getElementById('utilidadNeta'),
  efectivoMes: document.getElementById('efectivoMes'),
  transferMes: document.getElementById('transferMes'),
  valorInventario: document.getElementById('valorInventario'),
  nominaMes: document.getElementById('nominaMes'),
  margenLabel: document.getElementById('margenLabel'),
  ventasDiaMeta: document.getElementById('ventasDiaMeta'),
  ventasMesMeta: document.getElementById('ventasMesMeta'),
  utilidadBrutaMeta: document.getElementById('utilidadBrutaMeta'),
  utilidadNetaMeta: document.getElementById('utilidadNetaMeta'),
  efectivoMesMeta: document.getElementById('efectivoMesMeta'),
  transferMesMeta: document.getElementById('transferMesMeta'),
  valorInventarioMeta: document.getElementById('valorInventarioMeta'),
  nominaMesMeta: document.getElementById('nominaMesMeta')
};

const state = {
  users: loadFromStorage(STORAGE_KEYS.users, []),
  employees: loadFromStorage(STORAGE_KEYS.employees, []),
  products: loadFromStorage(STORAGE_KEYS.products, []),
  expenses: loadFromStorage(STORAGE_KEYS.expenses, []),
  sales: loadFromStorage(STORAGE_KEYS.sales, []),
  shifts: loadFromStorage(STORAGE_KEYS.shifts, []),
  trustedDevices: loadFromStorage(STORAGE_KEYS.trustedDevices, []),
  businessProfile: loadFromStorage(STORAGE_KEYS.businessProfile, {
    name: 'SUPERMERCADO LA ESPERANZA',
    nit: '890.987.654-3',
    address: 'Sede Poblado - Medellín, Ant.',
    phone: '(604) 555-1234'
  })
};

function uid(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function loadFromStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getDeviceId() {
  return btoa(`${navigator.userAgent}|${navigator.platform}|${screen.width}x${screen.height}|${navigator.language}`);
}

function isDeviceTrusted() {
  return state.trustedDevices.includes(getDeviceId());
}

function setTrustedDevice() {
  const deviceId = getDeviceId();
  if (!state.trustedDevices.includes(deviceId)) {
    state.trustedDevices.push(deviceId);
    saveToStorage(STORAGE_KEYS.trustedDevices, state.trustedDevices);
  }
}

function ensureOwnerAccount() {
  const owner = getOwnerAccount();
  const otherUsers = state.users.filter((user) => user.role !== 'owner');
  const hasWrongOwner = state.users.some((user) => user.role === 'owner' && (user.email !== OWNER_EMAIL || user.password !== OWNER_PASSWORD));

  if (!state.users.some((user) => user.role === 'owner') || hasWrongOwner) {
    state.users = [...otherUsers, owner];
  }

  return owner;
}

function premiumSeedData() {
  ensureOwnerAccount();

  if (state.employees.length || state.products.length || state.expenses.length || state.sales.length || state.shifts.length) {
    return;
  }

  const owner = getOwnerAccount();
  state.users = state.users.some((user) => user.role === 'owner') ? state.users : [owner, ...state.users];

  state.employees.push(
    { id: 'emp-1', name: 'Laura Gómez', cargo: 'Cajera', documento: '1002003001', telefono: '3001112233', salario: 1800000 },
    { id: 'emp-2', name: 'Mateo Ruiz', cargo: 'Supervisor', documento: '1002003002', telefono: '3011112234', salario: 2200000 },
    { id: 'emp-3', name: 'Sofía Pérez', cargo: 'Auxiliar', documento: '1002003003', telefono: '3021112235', salario: 1600000 }
  );

  state.products.push(
    { id: 'prod-1', name: 'Mouse Gamer', descripcion: 'Mouse ergonómico gamer', codigo: 'MOU-001', precioVenta: 95000, cantidad: 20, stockMin: 7, precioCosto: 42000 },
    { id: 'prod-2', name: 'Teclado Mecánico', descripcion: 'Teclado premium', codigo: 'TEC-002', precioVenta: 180000, cantidad: 12, stockMin: 7, precioCosto: 82000 },
    { id: 'prod-3', name: 'Monitor 27"', descripcion: 'Pantalla Full HD', codigo: 'MON-003', precioVenta: 420000, cantidad: 8, stockMin: 7, precioCosto: 260000 },
    { id: 'prod-4', name: 'Impresora Laser', descripcion: 'Impresora multifuncional', codigo: 'IMP-004', precioVenta: 610000, cantidad: 5, stockMin: 7, precioCosto: 390000 }
  );

  const today = new Date();
  const dateA = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
  const dateB = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  const dateC = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  state.expenses.push(
    { id: 'exp-1', descripcion: 'Servicio de internet', categoria: 'Administrativo', monto: 120000, fecha: formatDate(dateA) },
    { id: 'exp-2', descripcion: 'Publicidad digital', categoria: 'Marketing', monto: 350000, fecha: formatDate(dateB) },
    { id: 'exp-3', descripcion: 'Repuestos operación', categoria: 'Operación', monto: 280000, fecha: formatDate(dateC) }
  );

  const saleOne = { id: 'sale-1', total: 290000, paymentType: 'efectivo', date: formatDate(dateA), createdAt: new Date(dateA).toISOString(), items: [{ productId: 'prod-1', productCode: 'MOU-001', productName: 'Mouse Gamer', quantity: 2, unitCost: 42000, unitPrice: 95000 }] };
  const saleTwo = { id: 'sale-2', total: 420000, paymentType: 'transferencia', date: formatDate(dateB), createdAt: new Date(dateB).toISOString(), items: [{ productId: 'prod-2', productCode: 'TEC-002', productName: 'Teclado Mecánico', quantity: 1, unitCost: 82000, unitPrice: 180000 }] };
  const saleThree = { id: 'sale-3', total: 610000, paymentType: 'efectivo', date: formatDate(dateC), createdAt: new Date(dateC).toISOString(), items: [{ productId: 'prod-4', productCode: 'IMP-004', productName: 'Impresora Laser', quantity: 1, unitCost: 390000, unitPrice: 610000 }] };
  state.sales.push(saleOne, saleTwo, saleThree);

  state.shifts.push(
    {
      id: 'shift-1',
      employeeId: 'emp-1',
      employeeName: 'Laura Gómez',
      employeeDocument: '1002003001',
      openedAt: formatDateTime(dateA),
      closedAt: formatDateTime(dateA),
      baseCash: 200000,
      cashSales: 290000,
      transferSales: 0,
      cashPhysical: 490000,
      shouldHave: 490000,
      difference: 0,
      status: 'closed',
      sales: [saleOne]
    },
    {
      id: 'shift-2',
      employeeId: 'emp-2',
      employeeName: 'Mateo Ruiz',
      employeeDocument: '1002003002',
      openedAt: formatDateTime(dateB),
      closedAt: formatDateTime(dateB),
      baseCash: 200000,
      cashSales: 0,
      transferSales: 420000,
      cashPhysical: 200000,
      shouldHave: 200000,
      difference: 0,
      status: 'closed',
      sales: [saleTwo]
    }
  );

  state.businessProfile = {
    name: 'SUPERMERCADO LA ESPERANZA',
    nit: '890.987.654-3',
    address: 'Sede Poblado - Medellín, Ant.',
    phone: '(604) 555-1234'
  };

  saveAll();
}

function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDateTime(date) {
  return new Date(date).toISOString();
}

function saveAll() {
  saveToStorage(STORAGE_KEYS.users, state.users);
  saveToStorage(STORAGE_KEYS.employees, state.employees);
  saveToStorage(STORAGE_KEYS.products, state.products);
  saveToStorage(STORAGE_KEYS.expenses, state.expenses);
  saveToStorage(STORAGE_KEYS.sales, state.sales);
  saveToStorage(STORAGE_KEYS.shifts, state.shifts);
  saveToStorage(STORAGE_KEYS.businessProfile, state.businessProfile);
  saveToStorage(STORAGE_KEYS.masterPassword, getMasterPasswordValue());
  saveToStorage(STORAGE_KEYS.masterPasswordEnabled, String(isMasterPasswordEnabled()));
  if (appState.currentUser) {
    saveToStorage(STORAGE_KEYS.currentUser, appState.currentUser);
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }
  if (appState.currentShift) {
    saveToStorage(STORAGE_KEYS.currentShift, appState.currentShift);
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentShift);
  }
}

const OWNER_CONTACT_EMAIL = OWNER_EMAIL;

function getMasterPasswordValue() {
  return localStorage.getItem(STORAGE_KEYS.masterPassword) || DEFAULT_MASTER_PASSWORD;
}

function setMasterPasswordValue(value) {
  const safeValue = (value || '').trim();
  if (!safeValue) return;
  localStorage.setItem(STORAGE_KEYS.masterPassword, safeValue);
}

function isMasterPasswordEnabled() {
  const value = localStorage.getItem(STORAGE_KEYS.masterPasswordEnabled);
  if (value === null) return true;
  return value !== 'false';
}

function setMasterPasswordEnabled(enabled) {
  localStorage.setItem(STORAGE_KEYS.masterPasswordEnabled, String(Boolean(enabled)));
}

function getOwnerAccount() {
  return {
    id: 'owner-1',
    name: 'Tomuel',
    email: OWNER_EMAIL,
    password: OWNER_PASSWORD,
    role: 'owner',
    isActive: true,
    requiresMasterPassword: true
  };
}

function ensureStoredOwnerAccount() {
  const owner = getOwnerAccount();
  const otherUsers = state.users.filter((user) => user.role !== 'owner');
  const ownerExists = state.users.some((user) => user.role === 'owner');

  if (!ownerExists || state.users.some((user) => user.role === 'owner' && (user.email !== OWNER_EMAIL || user.password !== OWNER_PASSWORD))) {
    state.users = [...otherUsers, owner];
  }

  return owner;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'toastContainer', className: 'toast-container' }));
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

function showSystemAlert(message, title = 'Alerta del sistema') {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal-box system-alert-box';

  const heading = document.createElement('h3');
  heading.textContent = title;

  const text = document.createElement('p');
  text.className = 'system-alert-text';
  text.textContent = message;

  const actions = document.createElement('div');
  actions.className = 'modal-actions';

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'primary-btn';
  close.textContent = 'Entendido';
  close.addEventListener('click', () => overlay.remove());

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) overlay.remove();
  });

  actions.appendChild(close);
  modal.append(heading, text, actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function getMasterPasswordErrorMessage() {
  return `Contraseña incorrecta. Comunícate con el dueño del sistema. Correo: ${OWNER_CONTACT_EMAIL}`;
}

function requestTextInput(message, defaultValue = '', inputType = 'text') {
  if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
    try {
      return Promise.resolve(window.prompt(message, defaultValue));
    } catch (error) {
      // fall through to custom modal
    }
  }

  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-box';

    const title = document.createElement('h3');
    title.textContent = 'Confirmación requerida';

    const label = document.createElement('label');
    label.textContent = message;

    const field = document.createElement('input');
    field.type = inputType;
    field.value = defaultValue;
    field.className = 'modal-input';
    field.setAttribute('aria-label', message);

    const actions = document.createElement('div');
    actions.className = 'modal-actions';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'secondary-btn';
    cancel.textContent = 'Cancelar';

    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'primary-btn';
    confirm.textContent = 'Aceptar';

    const close = () => {
      overlay.remove();
      resolve(null);
    };

    cancel.addEventListener('click', close);
    confirm.addEventListener('click', () => {
      overlay.remove();
      resolve(field.value);
    });

    field.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        confirm.click();
      }
      if (event.key === 'Escape') {
        close();
      }
    });

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close();
    });

    actions.append(cancel, confirm);
    modal.append(title, label, field, actions);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    field.focus();
    field.select();
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value || 0);
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString('es-CO');
}

function normalizeDocument(value) {
  return String(value || '').replace(/[^0-9]/g, '');
}

function setAuthMode(mode) {
  appState.authMode = mode;
  elements.authTabs.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
  elements.loginForm.classList.toggle('hidden', mode !== 'login');
  elements.registerForm.classList.toggle('hidden', mode !== 'register');
}

function showBecauseLicenseRequired() {
  elements.licenseGate.classList.remove('hidden');
  elements.authScreen.classList.add('hidden');
  elements.dashboardScreen.classList.add('hidden');
}

function showAuthScreen() {
  elements.licenseGate.classList.add('hidden');
  elements.authScreen.classList.remove('hidden');
  elements.dashboardScreen.classList.add('hidden');
}

function showDashboard() {
  elements.licenseGate.classList.add('hidden');
  elements.authScreen.classList.add('hidden');
  elements.dashboardScreen.classList.remove('hidden');
}

function getCurrentUserDisplay() {
  if (appState.currentUser) return appState.currentUser.name;
  if (appState.currentShift) return `Caja: ${appState.currentShift.employeeName}`;
  return 'Invitado';
}

function isOwnerUser(user = appState.currentUser) {
  return Boolean(user && user.role === 'owner');
}

function isAccountAllowedForLogin(user) {
  if (!user) return false;
  if (user.isActive === false) return false;
  return true;
}

function ensureUserAccessFlags(user) {
  if (!user) return user;
  const normalized = { ...user };
  if (normalized.role === undefined) normalized.role = 'admin';
  if (normalized.isActive === undefined) normalized.isActive = true;
  if (normalized.requiresMasterPassword === undefined) normalized.requiresMasterPassword = true;
  return normalized;
}

function requireMasterPassword(inputElement = elements.masterPasswordInput) {
  if (!isMasterPasswordEnabled()) {
    setTrustedDevice();
    return true;
  }

  const passwordValue = (inputElement?.value || '').trim();
  if (passwordValue !== getMasterPasswordValue()) {
    showSystemAlert(getMasterPasswordErrorMessage(), 'Contraseña incorrecta');
    return false;
  }
  setTrustedDevice();
  return true;
}

async function loginOwner(event) {
  event.preventDefault();

  if (!isDeviceTrusted() && !requireMasterPassword()) return;

  const email = elements.loginEmail.value.trim();
  const password = elements.loginPassword.value.trim();
  const foundUser = state.users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

  if (!foundUser) {
    showToast('Credenciales inválidas.', 'error');
    return;
  }

  if (!isAccountAllowedForLogin(foundUser)) {
    showToast('Esta cuenta está deshabilitada por el dueño del sistema.', 'error');
    return;
  }

  if (foundUser.requiresMasterPassword && !isDeviceTrusted() && isMasterPasswordEnabled()) {
    const confirmation = await requestTextInput('Para continuar, escribe la contraseña maestra del sistema:', '', 'password');
    if (confirmation === null || confirmation === undefined || confirmation === '' || confirmation !== getMasterPasswordValue()) {
      showSystemAlert(getMasterPasswordErrorMessage(), 'Contraseña incorrecta');
      return;
    }
  }

  appState.currentUser = ensureUserAccessFlags(foundUser);
  appState.currentShift = null;
  appState.pendingSale = null;
  appState.adminMode = true;
  saveAll();
  renderDashboard();
}

function registerOwner(event) {
  event.preventDefault();

  const businessName = (elements.registerBusinessName || {}).value?.trim();
  const businessNit = (elements.registerBusinessNit || {}).value?.trim();
  const businessAddress = (elements.registerBusinessAddress || {}).value?.trim();
  const businessPhone = (elements.registerBusinessPhone || {}).value?.trim();
  const name = elements.registerName.value.trim();
  const email = elements.registerEmail.value.trim();
  const password = elements.registerPassword.value.trim();
  const masterPassword = elements.registerMasterPassword.value.trim();

  const termsAccepted = document.getElementById('registerTerms')?.checked;

  if (!businessName || !businessNit || !businessAddress || !businessPhone || !name || !email || !password || !masterPassword) {
    showToast('Completa todos los campos para crear la cuenta.', 'error');
    return;
  }

  if (!termsAccepted) {
    showToast('Debes aceptar los términos y condiciones antes de crear la cuenta.', 'error');
    return;
  }

  if (isMasterPasswordEnabled() && masterPassword !== getMasterPasswordValue()) {
    showSystemAlert(getMasterPasswordErrorMessage(), 'Contraseña incorrecta');
    return;
  }

  if (state.users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    showToast('Ya existe una cuenta con ese correo.', 'error');
    return;
  }

  const newUser = { id: uid('user'), name, email, password, role: 'admin', isActive: true, requiresMasterPassword: true };

  const ownerAccount = state.users.find((user) => user.role === 'owner') || getOwnerAccount();
  const remainingUsers = state.users.filter((user) => user.role !== 'owner');
  state.users = [...remainingUsers, ownerAccount, newUser];
  state.employees = [];
  state.products = [];
  state.expenses = [];
  state.sales = [];
  state.shifts = [];
  state.businessProfile = { name: businessName, nit: businessNit, address: businessAddress, phone: businessPhone };

  appState.currentUser = newUser;
  appState.currentShift = null;
  appState.pendingSale = null;
  appState.adminMode = true;
  setTrustedDevice();
  saveAll();
  elements.registerForm.reset();
  renderDashboard();
  showToast('Cuenta creada correctamente. La información demo fue limpiada.', 'success');
}

function logout() {
  appState.currentUser = null;
  appState.currentShift = null;
  appState.pendingSale = null;
  appState.currentView = 'panel';
  appState.ownerConsoleOpen = false;
  hideOwnerConsole();
  elements.loginForm.reset();
  elements.registerForm.reset();
  elements.employeeDocumentInput.value = '';
  localStorage.removeItem(STORAGE_KEYS.currentUser);
  localStorage.removeItem(STORAGE_KEYS.currentShift);
  showAuthScreen();
  setAuthMode('login');
}

function updateNavAccess() {
  const privateItems = document.querySelectorAll('.private-only');
  const hasAdmin = Boolean(appState.currentUser && (appState.currentUser.role === 'admin' || appState.currentUser.role === 'owner'));
  privateItems.forEach((item) => item.classList.toggle('hidden', !hasAdmin));

  elements.navItems.forEach((item) => {
    item.classList.remove('hidden');
    if (hasAdmin) {
      item.classList.toggle('active', item.dataset.view === appState.currentView);
    } else {
      item.classList.toggle('hidden', item.dataset.view !== 'caja');
      item.classList.toggle('active', item.dataset.view === 'caja');
    }
  });

  if (elements.ownerConsoleBtn) {
    const isOwnerLoggedIn = isOwnerUser(appState.currentUser);
    elements.ownerConsoleBtn.classList.toggle('hidden', !isOwnerLoggedIn);
  }
}

function setActiveView(view) {
  appState.currentView = view;
  elements.views.forEach((panel) => {
    const isActive = panel.id === `view-${view}`;
    panel.classList.toggle('active-view', isActive);
    panel.classList.toggle('hidden', !isActive);
  });

  elements.navItems.forEach((button) => {
    button.classList.toggle('active', button.dataset.view === view);
  });
}

function getCurrentShiftSalesSummary() {
  if (!appState.currentShift) return { total: 0, cash: 0, transfer: 0 };
  const total = appState.currentShift.sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const cash = appState.currentShift.sales.filter((sale) => sale.paymentType === 'efectivo').reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const transfer = appState.currentShift.sales.filter((sale) => sale.paymentType === 'transferencia').reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  return { total, cash, transfer };
}

function renderCashStatus() {
  if (!appState.currentShift) {
    elements.cashStatusBox.innerHTML = '<div><strong>No se ha activado el turno</strong><span>Activa el turno en esta misma sección para comenzar a vender.</span></div>';
    elements.turnSalesTotal.textContent = formatCurrency(0);
    elements.turnCashTotal.textContent = formatCurrency(0);
    elements.turnTransferTotal.textContent = formatCurrency(0);
    elements.cashTotal.textContent = formatCurrency(0);
    return;
  }

  const summary = getCurrentShiftSalesSummary();
  elements.cashStatusBox.innerHTML = `
    <div>
      <span class="label">Turno activo</span>
      <strong>${appState.currentShift.employeeName}</strong>
      <p>${appState.currentShift.employeeDocument}</p>
    </div>
    <div>
      <span class="label">Base inicial</span>
      <strong>${formatCurrency(appState.currentShift.baseCash)}</strong>
    </div>
    <div>
      <span class="label">Ventas</span>
      <strong>${formatCurrency(summary.total)}</strong>
    </div>
  `;

  elements.turnSalesTotal.textContent = formatCurrency(summary.total);
  elements.turnCashTotal.textContent = formatCurrency(summary.cash);
  elements.turnTransferTotal.textContent = formatCurrency(summary.transfer);
  elements.cashTotal.textContent = formatCurrency(summary.total);
}

function syncCashActivationState() {
  const hasTurn = Boolean(appState.currentShift);
  if (elements.cashActivationPanel) {
    elements.cashActivationPanel.classList.toggle('hidden', hasTurn);
  }
  if (elements.cashSaleBox) {
    elements.cashSaleBox.classList.toggle('hidden', !hasTurn);
  }
}

function renderInventoryTable() {
  elements.inventoryTableBody.innerHTML = state.products.map((product) => `
    <tr>
      <td>${product.name}</td>
      <td>${product.codigo}</td>
      <td>${formatCurrency(product.precioVenta)}</td>
      <td>${formatNumber(product.cantidad)}</td>
      <td>${formatCurrency(product.precioCosto)}</td>
      <td><button class="delete-row-btn" type="button" data-type="product" data-id="${product.id}" aria-label="Eliminar producto">🗑️</button></td>
    </tr>
  `).join('');
}

function renderExpenseTable() {
  elements.expenseTableBody.innerHTML = state.expenses.map((expense) => `
    <tr>
      <td>${expense.descripcion}</td>
      <td>${expense.categoria}</td>
      <td>${formatCurrency(expense.monto)}</td>
      <td>${expense.fecha}</td>
      <td><button class="delete-row-btn" type="button" data-type="expense" data-id="${expense.id}" aria-label="Eliminar gasto">🗑️</button></td>
    </tr>
  `).join('');
}

function renderEmployeeTable() {
  elements.employeeTableBody.innerHTML = state.employees.map((person) => `
    <tr>
      <td>${person.name}</td>
      <td>${person.cargo}</td>
      <td>${person.documento}</td>
      <td>${person.telefono}</td>
      <td>${formatCurrency(person.salario)}</td>
      <td><button class="delete-row-btn" type="button" data-type="employee" data-id="${person.id}" aria-label="Eliminar empleado">🗑️</button></td>
    </tr>
  `).join('');
}

function renderExpenseDonut() {
  const totals = {};
  state.expenses.forEach((expense) => {
    totals[expense.categoria] = (totals[expense.categoria] || 0) + Number(expense.monto || 0);
  });

  const colors = ['#7ba8ff', '#ffbf7a', '#7de0b1', '#a78bfa', '#ff7ea7'];
  const entries = Object.entries(totals);
  const total = entries.reduce((sum, [, value]) => sum + value, 0) || 1;
  let cursor = 0;
  const segments = entries.map(([, value], index) => {
    const start = cursor;
    const end = cursor + (value / total) * 100;
    cursor = end;
    return `${colors[index % colors.length]} ${start}% ${end}%`;
  }).join(', ');

  elements.expenseDonut.style.background = `conic-gradient(${segments})`;
  elements.expenseLegend.innerHTML = entries.map(([label, value], index) => `
    <li><span class="legend-swatch" style="background:${colors[index % colors.length]}"></span>${label} (${formatCurrency(value)})</li>
  `).join('');
}

function renderCierreCajaTable() {
  const rows = state.shifts.filter((shift) => shift.status === 'closed').map((shift) => {
    const shouldHave = Number(shift.baseCash || 200000) + Number(shift.cashSales || 0);
    const tiene = Number(shift.cashPhysical || 0);
    const diff = tiene - shouldHave;
    return `
      <tr>
        <td>${formatCurrency(shouldHave)}</td>
        <td>${formatCurrency(tiene)}</td>
        <td class="${diff >= 0 ? 'positive' : 'negative'}">${formatCurrency(diff)}</td>
        <td>${formatCurrency(shift.transferSales || 0)}</td>
      </tr>
    `;
  }).join('');

  elements.cierreCajaTable.innerHTML = rows || '<tr><td colspan="4">No hay cierres registrados</td></tr>';
}

function renderEmployeeHistory() {
  const history = state.shifts.filter((shift) => shift.status === 'closed');

  elements.employeeHistory.innerHTML = history.map((shift) => `
    <div class="history-item">
      <strong>${shift.employeeName}</strong>
      <span>Documento: ${shift.employeeDocument}</span>
      <span>Abrió: ${new Date(shift.openedAt).toLocaleString('es-CO')}</span>
      <span>Ventas: ${shift.sales.map((sale) => `${sale.paymentType} ${formatCurrency(sale.total)}`).join(' · ') || 'Sin ventas'}</span>
    </div>
  `).join('') || '<div class="history-item"><strong>Sin historial</strong></div>';
}

function renderPanelDetailLists() {
  const payrollList = document.getElementById('payrollList');
  const expenseList = document.getElementById('expenseList');
  const lowStockList = document.getElementById('lowStockList');
  const topProductsList = document.getElementById('topProductsList');
  const salesLogList = document.getElementById('salesLogList');

  payrollList.innerHTML = state.employees.map((employee) => `
    <div class="mini-item"><strong>${employee.name}</strong><span>${employee.cargo}</span><small>Doc: ${employee.documento}</small><small>${formatCurrency(employee.salario)} / mensual</small></div>
  `).join('') || '<div class="mini-item"><strong>Sin empleados</strong></div>';

  expenseList.innerHTML = state.expenses.slice().reverse().slice(0, 5).map((expense) => `
    <div class="mini-item"><strong>${expense.descripcion}</strong><span>${expense.categoria}</span><small>${formatCurrency(expense.monto)} · ${expense.fecha}</small></div>
  `).join('') || '<div class="mini-item"><strong>Sin gastos</strong></div>';

  const lowStock = state.products.filter((product) => Number(product.cantidad) < 7);
  lowStockList.innerHTML = (lowStock.length ? lowStock : state.products.slice(0, 3)).map((product) => `
    <div class="mini-item"><strong>${product.name}</strong><span>Stock: ${formatNumber(product.cantidad)}</span><small>Alerta si está bajo de 7</small></div>
  `).join('') || '<div class="mini-item"><strong>Sin stock bajo</strong></div>';

  const productCounts = {};
  state.sales.forEach((sale) => {
    sale.items.forEach((item) => {
      productCounts[item.productName] = (productCounts[item.productName] || 0) + Number(item.quantity || 0);
    });
  });

  const topProducts = Object.entries(productCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  topProductsList.innerHTML = (topProducts.length ? topProducts : [['Sin ventas', 0]]).map(([name, value]) => `
    <div class="mini-item"><strong>${name}</strong><span>Unidades vendidas</span><small>${formatNumber(value)}</small></div>
  `).join('');

  const salesLog = state.shifts.filter((shift) => Array.isArray(shift.sales) && shift.sales.length).map((shift) => ({
    employeeName: shift.employeeName,
    openedAt: shift.openedAt,
    sales: shift.sales
  }));

  salesLogList.innerHTML = (salesLog.length ? salesLog : []).map((shift) => `
    <div class="sales-log-block">
      <div class="sales-log-header">
        <strong>${shift.employeeName}</strong>
        <span>${new Date(shift.openedAt).toLocaleDateString('es-CO')} · ${new Date(shift.openedAt).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      ${shift.sales.map((sale) => `
        <div class="sales-log-row">
          <div>
            <strong>${sale.items.map((entry) => entry.productName).join(', ') || 'Venta'}</strong>
            <span>${sale.paymentType === 'efectivo' ? 'Efectivo' : 'Transferencia'} · ${new Date(sale.createdAt || sale.date).toLocaleString('es-CO')}</span>
          </div>
          <small>${formatCurrency(sale.total)}</small>
        </div>
      `).join('')}
    </div>
  `).join('') || '<div class="mini-item"><strong>Sin ventas por turno</strong></div>';
}

function renderPanelMetrics() {
  const totalSalesMonthly = state.sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalSalesToday = state.sales.filter((sale) => sale.date === formatDate(new Date())).reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalCashMonthly = state.sales.filter((sale) => sale.paymentType === 'efectivo').reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalTransferMonthly = state.sales.filter((sale) => sale.paymentType === 'transferencia').reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const productCostValue = state.products.reduce((sum, product) => sum + Number(product.precioCosto || 0) * Number(product.cantidad || 0), 0);
  const expenseTotalMonth = state.expenses.reduce((sum, expense) => sum + Number(expense.monto || 0), 0);
  const payrollTotal = state.employees.reduce((sum, person) => sum + Number(person.salario || 0), 0);

  const grossProfit = state.sales.reduce((sum, sale) => {
    const itemCost = sale.items.reduce((subtotal, item) => subtotal + (Number(item.unitCost || 0) * Number(item.quantity || 0)), 0);
    return sum + (Number(sale.total || 0) - itemCost);
  }, 0);

  const netProfit = grossProfit - expenseTotalMonth - payrollTotal;
  const margin = totalSalesMonthly ? (netProfit / totalSalesMonthly) * 100 : 0;
  const costBase = Math.max(totalSalesMonthly * 0.55, expenseTotalMonth + payrollTotal);

  elements.ventasDia.textContent = formatCurrency(totalSalesToday);
  elements.ventasMes.textContent = formatCurrency(totalSalesMonthly);
  elements.utilidadBruta.textContent = formatCurrency(grossProfit);
  elements.utilidadNeta.textContent = formatCurrency(netProfit);
  elements.efectivoMes.textContent = formatCurrency(totalCashMonthly);
  elements.transferMes.textContent = formatCurrency(totalTransferMonthly);
  elements.valorInventario.textContent = formatCurrency(productCostValue);
  elements.nominaMes.textContent = formatCurrency(payrollTotal);
  elements.margenLabel.textContent = `${margin.toFixed(1)}%`;

  elements.ventasDiaMeta.textContent = totalSalesToday ? 'Movimiento del día' : 'Sin movimiento';
  elements.ventasMesMeta.textContent = 'Acumulado mensual';
  elements.utilidadBrutaMeta.textContent = 'Venta menos costo';
  elements.utilidadNetaMeta.textContent = `${margin.toFixed(1)}% de margen`;
  elements.efectivoMesMeta.textContent = 'Ventas en efectivo';
  elements.transferMesMeta.textContent = 'Pagos digitales';
  elements.valorInventarioMeta.textContent = 'Costo de compra';
  elements.nominaMesMeta.textContent = 'Costo laboral';

  const incomeBar = document.querySelector('#incomeChart .bar.income');
  const costBar = document.querySelector('#incomeChart .bar.cost');
  if (incomeBar) incomeBar.style.height = `${totalSalesMonthly ? Math.min(100, (totalSalesMonthly / Math.max(totalSalesMonthly, costBase)) * 100) : 0}%`;
  if (costBar) costBar.style.height = `${costBase ? Math.min(100, (costBase / Math.max(totalSalesMonthly, costBase)) * 100) : 0}%`;

  renderCierreCajaTable();
  renderEmployeeHistory();
  renderPanelDetailLists();
}

function deleteInventoryProduct(productId) {
  state.products = state.products.filter((product) => product.id !== productId);
  saveToStorage(STORAGE_KEYS.products, state.products);
  renderInventoryTable();
  renderPanelMetrics();
  showToast('Producto eliminado.', 'success');
}

function deleteExpenseRecord(expenseId) {
  state.expenses = state.expenses.filter((expense) => expense.id !== expenseId);
  saveToStorage(STORAGE_KEYS.expenses, state.expenses);
  renderExpenseTable();
  renderExpenseDonut();
  renderPanelMetrics();
  showToast('Gasto eliminado.', 'success');
}

function deleteEmployeeRecord(employeeId) {
  state.employees = state.employees.filter((person) => person.id !== employeeId);
  saveToStorage(STORAGE_KEYS.employees, state.employees);
  renderEmployeeTable();
  renderPanelMetrics();
  showToast('Empleado eliminado.', 'success');
}

function addInventoryProduct(event) {
  event.preventDefault();
  const name = document.getElementById('productName').value.trim();
  const code = document.getElementById('productCode').value.trim();
  const descripcion = document.getElementById('productDescription').value.trim();
  const precioVenta = Number(document.getElementById('productPrice').value || 0);
  const cantidad = Number(document.getElementById('productQty').value || 0);
  const stockMin = Number(document.getElementById('productMinStock').value || 0);
  const precioCosto = Number(document.getElementById('productCost').value || 0);

  if (!name || !code || !descripcion || !precioVenta || !cantidad || !stockMin || !precioCosto) {
    showToast('Completa todos los campos del producto.', 'error');
    return;
  }

  state.products.push({ id: uid('prod'), name, descripcion, codigo: code, precioVenta, cantidad, stockMin, precioCosto });
  saveToStorage(STORAGE_KEYS.products, state.products);
  event.target.reset();
  renderInventoryTable();
  renderPanelMetrics();
}

function addExpense(event) {
  event.preventDefault();
  const descripcion = document.getElementById('expenseDescription').value.trim();
  const categoria = document.getElementById('expenseCategory').value;
  const monto = Number(document.getElementById('expenseAmount').value || 0);
  const fecha = document.getElementById('expenseDate').value;

  if (!descripcion || !categoria || !monto || !fecha) {
    showToast('Completa todos los datos del gasto.', 'error');
    return;
  }

  state.expenses.push({ id: uid('exp'), descripcion, categoria, monto, fecha });
  saveToStorage(STORAGE_KEYS.expenses, state.expenses);
  event.target.reset();
  renderExpenseTable();
  renderExpenseDonut();
  renderPanelMetrics();
}

function addEmployee(event) {
  event.preventDefault();
  const name = document.getElementById('employeeName').value.trim();
  const cargo = document.getElementById('employeeRole').value.trim();
  const documento = document.getElementById('employeeDocument').value.trim();
  const telefono = document.getElementById('employeePhone').value.trim();
  const salario = Number(document.getElementById('employeeSalary').value || 0);

  if (!name || !cargo || !documento || !telefono || !salario) {
    showToast('Completa todos los datos del empleado.', 'error');
    return;
  }

  state.employees.push({ id: uid('emp'), name, cargo, documento, telefono, salario });
  saveToStorage(STORAGE_KEYS.employees, state.employees);
  event.target.reset();
  renderEmployeeTable();
  renderPanelMetrics();
}

function renderSalePreview() {
  if (!appState.pendingSale) {
    elements.salePreview.classList.add('hidden');
    elements.paymentChoice.classList.add('hidden');
    elements.registerSaleBtn.classList.add('hidden');
    return;
  }

  const { product, quantity } = appState.pendingSale;
  const total = product.precioVenta * quantity;
  elements.salePreview.classList.remove('hidden');
  elements.salePreview.innerHTML = `
    <div class="product-preview-card">
      <div class="product-preview-head">
        <div>
          <strong>${product.name}</strong>
          <span>Código: ${product.codigo}</span>
        </div>
        <span class="qty-badge">${quantity} und</span>
      </div>
      <div class="preview-meta-row"><span>Precio unitario</span><strong>${formatCurrency(product.precioVenta)}</strong></div>
      <div class="preview-meta-row"><span>Descripción</span><strong>${product.descripcion || 'Producto de almacén'}</strong></div>
      <div class="preview-meta-row"><span>Subtotal</span><strong>${formatCurrency(total)}</strong></div>
    </div>
  `;

  elements.cashTotal.textContent = formatCurrency(total);
  elements.paymentChoice.classList.remove('hidden');
  elements.registerSaleBtn.classList.remove('hidden');
}

function handlePaymentSelection(paymentType) {
  document.querySelectorAll('.payment-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.payment === paymentType);
  });
  if (appState.pendingSale) {
    appState.pendingSale.paymentType = paymentType;
  }
}

function createSaleFromPending() {
  if (!appState.pendingSale || !appState.currentShift) {
    showToast('Debe seleccionar primero un producto y tener un turno activo.', 'error');
    return;
  }

  const { product, quantity, paymentType } = appState.pendingSale;
  const finalPayment = paymentType || 'efectivo';
  const saleTotal = Number(product.precioVenta || 0) * Number(quantity || 1);

  if (Number(product.cantidad) < Number(quantity)) {
    showToast(`Stock insuficiente. Solo quedan ${product.cantidad} unidades.`, 'error');
    return;
  }

  const sale = {
    id: uid('sale'),
    total: saleTotal,
    paymentType: finalPayment,
    date: formatDate(new Date()),
    createdAt: new Date().toISOString(),
    items: [{
      productId: product.id,
      productCode: product.codigo,
      productName: product.name,
      quantity: Number(quantity),
      unitCost: Number(product.precioCosto || 0),
      unitPrice: Number(product.precioVenta || 0)
    }]
  };

  product.cantidad = Number(product.cantidad) - Number(quantity);
  appState.currentShift.sales.push(sale);
  appState.currentShift.cashSales += finalPayment === 'efectivo' ? saleTotal : 0;
  appState.currentShift.transferSales += finalPayment === 'transferencia' ? saleTotal : 0;
  appState.currentShift.shouldHave = Number(appState.currentShift.baseCash || 200000) + Number(appState.currentShift.cashSales || 0);
  state.sales.push(sale);
  saveToStorage(STORAGE_KEYS.products, state.products);
  saveToStorage(STORAGE_KEYS.sales, state.sales);
  saveToStorage(STORAGE_KEYS.shifts, state.shifts);

  elements.saleProductCode.value = '';
  elements.saleQtyInput.value = '1';
  appState.pendingSale = null;
  renderSalePreview();
  renderCashStatus();
  renderInventoryTable();
  renderPanelMetrics();

  printReceipt(sale);
  showToast('Venta registrada correctamente.', 'success');
}

function printReceipt(saleOverride) {
  const activeSale = saleOverride || (appState.currentShift ? appState.currentShift.sales[appState.currentShift.sales.length - 1] : null);
  if (!activeSale) {
    showToast('No hay venta para imprimir.', 'error');
    return;
  }

  const profile = state.businessProfile;
  const saleItems = activeSale.items || [];
  const receiptDate = new Date(activeSale.createdAt || new Date());
  const rows = saleItems.map((item) => `
    <tr>
      <td>${Number(item.quantity || 0)}</td>
      <td>${item.productName}</td>
      <td>${formatCurrency((Number(item.unitPrice || 0) * Number(item.quantity || 0)))}</td>
    </tr>
  `).join('');

  const receiptMarkup = `
    <div class="receipt-preview-header">
      <h2>${profile.name || 'SUPERMERCADO LA ESPERANZA'}</h2>
      <p>NIT: ${profile.nit || '890.987.654-3'}</p>
      <p>${profile.address || 'Sede Poblado - Medellín, Ant.'}</p>
      <p>Teléfono: ${profile.phone || '(604) 555-1234'}</p>
    </div>
    <div class="receipt-preview-divider"></div>
    <p>Factura de Venta POS: #${Math.floor(Math.random() * 900000) + 100000}</p>
    <p>Caja: ${appState.currentShift ? appState.currentShift.employeeDocument : 'Cajero'} · ${appState.currentShift ? appState.currentShift.employeeName : 'Cajero'}</p>
    <p>Fecha: ${receiptDate.toLocaleDateString('es-CO')} · Hora: ${receiptDate.toLocaleTimeString('es-CO', { hour12: true })}</p>
    <div class="receipt-preview-divider"></div>
    <table class="receipt-preview-table">
      <thead>
        <tr>
          <th>CANT</th>
          <th>DESCRIPCIÓN</th>
          <th>VALOR</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="receipt-preview-divider"></div>
    <p class="receipt-preview-total"><strong>TOTAL: ${formatCurrency(activeSale.total)}</strong></p>
    <p>MEDIO DE PAGO: ${activeSale.paymentType.toUpperCase()}</p>
    <div class="receipt-preview-divider"></div>
    <p class="receipt-preview-footer"><strong>¡GRACIAS POR SU COMPRA!</strong></p>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal-box receipt-preview-box';

  const title = document.createElement('h3');
  title.textContent = 'Vista previa del recibo';

  const content = document.createElement('div');
  content.className = 'receipt-preview-content';
  content.innerHTML = receiptMarkup;

  const actions = document.createElement('div');
  actions.className = 'modal-actions';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'secondary-btn';
  closeBtn.textContent = 'Cerrar';

  const printBtn = document.createElement('button');
  printBtn.type = 'button';
  printBtn.className = 'primary-btn';
  printBtn.textContent = 'Imprimir';

  const closePreview = () => overlay.remove();

  closeBtn.addEventListener('click', closePreview);
  printBtn.addEventListener('click', () => {
    const printWindow = window.open('', '_blank', 'width=420,height=700');
    if (!printWindow) {
      showToast('El navegador bloqueó la ventana de impresión.', 'error');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Recibo de venta</title>
          <style>body{font-family:Arial,sans-serif;padding:24px;color:#111}h2,h3,p{margin:4px 0}table{width:100%;border-collapse:collapse;margin-top:12px}th,td{padding:4px 0;font-size:12px}.receipt-preview-header{text-align:center}.receipt-preview-divider{border-bottom:1px solid #111;margin:10px 0}.receipt-preview-total{text-align:right}.receipt-preview-footer{text-align:center}</style>
        </head>
        <body>${receiptMarkup}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 350);
    closePreview();
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closePreview();
  });

  actions.append(closeBtn, printBtn);
  modal.append(title, content, actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

async function closeCashShift() {
  if (!appState.currentShift) {
    showToast('No hay un turno abierto para cerrar.', 'error');
    return;
  }

  const shouldHave = Number(appState.currentShift.baseCash || 200000) + Number(appState.currentShift.cashSales || 0);
  const inputValue = await requestTextInput(`Efectivo que debe haber en caja: ${formatCurrency(shouldHave)}\nIngrese el efectivo contado real:`, '0', 'number');
  if (inputValue === null || inputValue === undefined || inputValue === '') return;

  const physicalCash = Number(inputValue);
  if (Number.isNaN(physicalCash) || physicalCash < 0) {
    showToast('Ingrese un valor válido para el efectivo físico.', 'error');
    return;
  }

  const difference = Number(physicalCash) - shouldHave;
  appState.currentShift.status = 'closed';
  appState.currentShift.closedAt = new Date().toISOString();
  appState.currentShift.cashPhysical = physicalCash;
  appState.currentShift.shouldHave = shouldHave;
  appState.currentShift.difference = difference;

  state.shifts = state.shifts.map((shift) => shift.id === appState.currentShift.id ? appState.currentShift : shift);
  appState.currentShift = null;
  appState.pendingSale = null;
  saveAll();
  renderDashboard();
  showToast(`Caja cerrada. Debía haber ${formatCurrency(shouldHave)} y se contó ${formatCurrency(physicalCash)}. Diferencia: ${formatCurrency(difference)}.`, 'success');
}

async function verifyModulePassword(moduleName) {
  if (!appState.currentUser) {
    showToast('Debe iniciar sesión para entrar a este módulo.', 'error');
    return false;
  }

  const password = await requestTextInput(`Para entrar a ${moduleName}, escribe la contraseña que registraste:`, '', 'password');
  if (password === null || password === undefined || password === '') return false;
  if (password !== appState.currentUser.password) {
    showToast('Contraseña incorrecta. Debes usar la misma contraseña del registro.', 'error');
    return false;
  }
  return true;
}

function openCashShift(documentNumber) {
  const documentNormalized = normalizeDocument(documentNumber);
  const employee = state.employees.find((person) => normalizeDocument(person.documento) === documentNormalized);
  if (!employee) {
    showToast('Documento de empleado no registrado.', 'error');
    return;
  }

  if (!/(cajero|cajera|caja)/i.test(String(employee.cargo || ''))) {
    showToast('Solo los empleados con cargo de cajero pueden abrir caja.', 'error');
    return;
  }

  const existingOpenShift = state.shifts.find((shift) => shift.status === 'open');
  if (existingOpenShift) {
    appState.currentShift = existingOpenShift;
    saveAll();
    renderDashboard();
    return;
  }

  const shift = {
    id: uid('shift'),
    employeeId: employee.id,
    employeeName: employee.name,
    employeeDocument: employee.documento,
    openedAt: new Date().toISOString(),
    closedAt: null,
    baseCash: 200000,
    cashSales: 0,
    transferSales: 0,
    cashPhysical: 0,
    shouldHave: 200000,
    difference: 0,
    status: 'open',
    sales: []
  };

  state.shifts.push(shift);
  appState.currentShift = shift;
  appState.currentUser = null;
  appState.adminMode = false;
  appState.pendingSale = null;
  saveAll();
  renderDashboard();
  showToast(`Turno abierto para ${employee.name}. La caja quedó habilitada.`, 'success');
}

function showOwnerConsole() {
  appState.ownerConsoleOpen = true;
  elements.ownerConsoleScreen.classList.remove('hidden');
  elements.dashboardScreen.classList.add('hidden');
  renderOwnerConsole();
}

function hideOwnerConsole() {
  appState.ownerConsoleOpen = false;
  if (elements.ownerConsoleScreen) {
    elements.ownerConsoleScreen.classList.add('hidden');
  }
}

function renderOwnerConsole() {
  if (!isOwnerUser(appState.currentUser)) {
    hideOwnerConsole();
    return;
  }

  const accounts = state.users.map((user) => ensureUserAccessFlags(user));
  const activeCount = accounts.filter((user) => user.isActive !== false).length;
  const masterProtected = accounts.filter((user) => user.requiresMasterPassword !== false).length;

  if (elements.ownerTotalAccounts) elements.ownerTotalAccounts.textContent = String(accounts.length);
  if (elements.ownerActiveAccounts) elements.ownerActiveAccounts.textContent = String(activeCount);
  if (elements.ownerMasterProtected) elements.ownerMasterProtected.textContent = String(masterProtected);
  if (elements.ownerBusinessNameInput) elements.ownerBusinessNameInput.value = state.businessProfile?.name || '';
  if (elements.ownerBusinessPhoneInput) elements.ownerBusinessPhoneInput.value = state.businessProfile?.phone || '';
  if (elements.ownerThemeSelect) elements.ownerThemeSelect.value = document.body.dataset.theme || 'dark';
  if (elements.ownerMasterStatusToggle) elements.ownerMasterStatusToggle.checked = isMasterPasswordEnabled();

  elements.ownerAccountsList.innerHTML = accounts.map((user) => {
    const isOwner = user.role === 'owner';
    const canToggleActive = !isOwner;
    const canToggleMaster = !isOwner;
    const canDelete = !isOwner;
    return `
      <div class="owner-account-row">
        <div class="owner-user-meta">
          <strong>${user.name}</strong>
          <span>${user.email}</span>
          <span>${user.role}</span>
        </div>
        <div class="owner-permissions">
          <span class="owner-permit-tag ${user.isActive !== false ? 'active' : 'warning'}">${user.isActive !== false ? 'Cuenta activa' : 'Cuenta deshabilitada'}</span>
          <span class="owner-permit-tag ${user.requiresMasterPassword !== false ? 'active' : 'warning'}">${user.requiresMasterPassword !== false ? 'Pide maestra' : 'Sin maestra'}</span>
        </div>
        <div class="owner-actions">
          <button type="button" class="owner-action-primary" data-owner-action="toggle-active" data-user-id="${user.id}" ${canToggleActive ? '' : 'disabled'}>${user.isActive !== false ? 'Desactivar' : 'Activar'}</button>
          <button type="button" data-owner-action="toggle-master" data-user-id="${user.id}" ${canToggleMaster ? '' : 'disabled'}>${user.requiresMasterPassword !== false ? 'Quitar maestra' : 'Pedir maestra'}</button>
          <button type="button" data-owner-action="delete-account" data-user-id="${user.id}" ${canDelete ? '' : 'disabled'}>Eliminar</button>
        </div>
      </div>
    `;
  }).join('');
}

async function confirmOwnerAction() {
  if (!isMasterPasswordEnabled()) {
    return true;
  }

  const password = await requestTextInput('Para gestionar cuentas, escribe la contraseña maestra del sistema:', '', 'password');
  if (password === null || password === undefined || password === '' || password !== getMasterPasswordValue()) {
    showSystemAlert(getMasterPasswordErrorMessage(), 'Contraseña incorrecta');
    return false;
  }
  return true;
}

async function toggleUserAccess(userId, key) {
  if (!isOwnerUser(appState.currentUser)) {
    showToast('Solo el dueño del sistema puede gestionar cuentas.', 'error');
    return;
  }

  const allowed = await confirmOwnerAction();
  if (!allowed) return;

  state.users = state.users.map((user) => {
    if (user.id !== userId) return ensureUserAccessFlags(user);
    const next = ensureUserAccessFlags(user);
    next[key] = key === 'isActive' ? !Boolean(next.isActive !== false) : !(next.requiresMasterPassword !== false);
    return next;
  });

  saveAll();
  renderOwnerConsole();
  showToast('Permiso actualizado correctamente.', 'success');
}

async function deleteUserAccount(userId) {
  if (!isOwnerUser(appState.currentUser)) {
    showToast('Solo el dueño del sistema puede eliminar cuentas.', 'error');
    return;
  }

  const targetUser = state.users.find((user) => user.id === userId);
  if (!targetUser || targetUser.role === 'owner') {
    showToast('No puedes eliminar la cuenta principal del dueño.', 'error');
    return;
  }

  const allowed = await confirmOwnerAction();
  if (!allowed) return;

  state.users = state.users.filter((user) => user.id !== userId);
  saveAll();
  renderOwnerConsole();
  showToast('Cuenta eliminada correctamente.', 'success');
}

function applyOwnerVisualSettings(event) {
  event.preventDefault();
  const businessName = elements.ownerBusinessNameInput?.value.trim() || state.businessProfile.name;
  const phone = elements.ownerBusinessPhoneInput?.value.trim() || state.businessProfile.phone;
  const theme = elements.ownerThemeSelect?.value || 'dark';

  state.businessProfile = {
    ...state.businessProfile,
    name: businessName,
    phone
  };

  document.body.dataset.theme = theme;
  saveToStorage(STORAGE_KEYS.businessProfile, state.businessProfile);
  showToast('Configuración del sistema guardada.', 'success');
}

function updateOwnerMasterPassword(event) {
  event.preventDefault();
  const currentValue = elements.ownerCurrentMasterPassword?.value.trim() || '';
  const nextValue = elements.ownerNewMasterPassword?.value.trim() || '';
  const confirmValue = elements.ownerConfirmMasterPassword?.value.trim() || '';

  if (!currentValue || !nextValue || !confirmValue) {
    showToast('Completa toda la información de la contraseña maestra.', 'error');
    return;
  }

  if (currentValue !== getMasterPasswordValue()) {
    showToast('La contraseña actual no coincide.', 'error');
    return;
  }

  if (nextValue !== confirmValue) {
    showToast('La nueva contraseña no coincide en la confirmación.', 'error');
    return;
  }

  setMasterPasswordValue(nextValue);
  setMasterPasswordEnabled(Boolean(elements.ownerMasterStatusToggle?.checked ?? true));
  showToast('Contraseña maestra actualizada.', 'success');
  elements.ownerCurrentMasterPassword.value = '';
  elements.ownerNewMasterPassword.value = '';
  elements.ownerConfirmMasterPassword.value = '';
}

function renderDashboard() {
  if (!isDeviceTrusted()) {
    showBecauseLicenseRequired();
    return;
  }

  const hasAdmin = Boolean(appState.currentUser && (appState.currentUser.role === 'admin' || appState.currentUser.role === 'owner'));
  const hasCashOpen = Boolean(appState.currentShift);

  elements.userPill.textContent = getCurrentUserDisplay();
  elements.logoutBtn.textContent = hasAdmin ? 'Cerrar sesión' : 'Salir';

  if (appState.currentUser || appState.currentShift) {
    if (appState.ownerConsoleOpen && isOwnerUser(appState.currentUser)) {
      showOwnerConsole();
    } else {
      hideOwnerConsole();
      showDashboard();
    }
    updateNavAccess();
  } else {
    hideOwnerConsole();
    showAuthScreen();
  }

  renderCashStatus();
  syncCashActivationState();
  renderInventoryTable();
  renderExpenseTable();
  renderEmployeeTable();
  renderExpenseDonut();
  renderPanelMetrics();

  if (hasAdmin) {
    setActiveView(appState.currentView);
    elements.closeCashBtn.disabled = true;
    elements.closeCashBtn.style.opacity = '0.5';
  } else {
    setActiveView('caja');
    elements.closeCashBtn.disabled = !hasCashOpen;
    elements.closeCashBtn.style.opacity = hasCashOpen ? '1' : '0.5';
  }

  elements.receiptActions.classList.add('hidden');
  elements.registerSaleBtn.classList.add('hidden');
  elements.paymentChoice.classList.add('hidden');
  elements.salePreview.classList.add('hidden');
}

function initializeOwnerPage() {
  const ownerGate = document.getElementById('ownerAccessGate');
  const ownerInput = document.getElementById('ownerAccessInput');
  const ownerUnlockBtn = document.getElementById('ownerUnlockBtn');
  const ownerConsole = document.getElementById('ownerConsoleScreen');
  const ownerBackBtn = document.getElementById('ownerCloseConsoleBtn');

  if (!ownerGate || !ownerUnlockBtn || !ownerConsole) return;

  const unlockOwnerPage = () => {
    if (!requireMasterPassword(ownerInput)) return;
    const ownerUser = state.users.find((user) => user.role === 'owner') || state.users[0];
    appState.currentUser = ensureUserAccessFlags(ownerUser);
    ownerGate.classList.add('hidden');
    ownerConsole.classList.remove('hidden');
    renderOwnerConsole();
  };

  ownerUnlockBtn.addEventListener('click', unlockOwnerPage);
  ownerInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') unlockOwnerPage();
  });

  ownerBackBtn?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  ownerConsole.classList.add('hidden');
  ownerGate.classList.remove('hidden');
}

function boot() {
  if (!localStorage.getItem(STORAGE_KEYS.masterPassword)) {
    localStorage.setItem(STORAGE_KEYS.masterPassword, DEFAULT_MASTER_PASSWORD);
  }
  if (localStorage.getItem(STORAGE_KEYS.masterPasswordEnabled) === null) {
    localStorage.setItem(STORAGE_KEYS.masterPasswordEnabled, 'true');
  }

  premiumSeedData();
  ensureStoredOwnerAccount();
  saveAll();
  appState.currentUser = loadFromStorage(STORAGE_KEYS.currentUser, null);
  appState.currentShift = loadFromStorage(STORAGE_KEYS.currentShift, null);
  state.businessProfile = loadFromStorage(STORAGE_KEYS.businessProfile, state.businessProfile);

  if (isOwnerPage) {
    return;
  }

  if (!isDeviceTrusted()) {
    showBecauseLicenseRequired();
  } else {
    showAuthScreen();
  }

  setAuthMode('login');
  renderDashboard();
}

document.getElementById('unlockBtn')?.addEventListener('click', () => {
  if (requireMasterPassword()) {
    showAuthScreen();
  }
});

elements.ownerConsoleBtn?.addEventListener('click', () => {
  if (!isOwnerUser(appState.currentUser)) {
    showToast('Solo el dueño del sistema puede abrir esta consola.', 'error');
    return;
  }
  showOwnerConsole();
});

elements.ownerCloseConsoleBtn?.addEventListener('click', () => {
  hideOwnerConsole();
  showDashboard();
});

if (elements.ownerAccountsList) {
  elements.ownerAccountsList.addEventListener('click', async (event) => {
    const actionBtn = event.target.closest('[data-owner-action]');
    if (!actionBtn) return;
    const { ownerAction, userId } = actionBtn.dataset;
    if (ownerAction === 'toggle-active') {
      await toggleUserAccess(userId, 'isActive');
    }
    if (ownerAction === 'toggle-master') {
      await toggleUserAccess(userId, 'requiresMasterPassword');
    }
    if (ownerAction === 'delete-account') {
      await deleteUserAccount(userId);
    }
  });
}

if (elements.ownerMasterPasswordForm) {
  elements.ownerMasterPasswordForm.addEventListener('submit', updateOwnerMasterPassword);
}

if (elements.ownerSettingsForm) {
  elements.ownerSettingsForm.addEventListener('submit', applyOwnerVisualSettings);
}

if (elements.ownerMasterStatusToggle) {
  elements.ownerMasterStatusToggle.addEventListener('change', () => {
    setMasterPasswordEnabled(elements.ownerMasterStatusToggle.checked);
    showToast(elements.ownerMasterStatusToggle.checked ? 'Contraseña maestra habilitada.' : 'Contraseña maestra suspendida.', 'info');
  });
}

elements.authTabs.forEach((button) => {
  button.addEventListener('click', () => setAuthMode(button.dataset.mode));
});

elements.loginForm?.addEventListener('submit', loginOwner);
elements.registerForm?.addEventListener('submit', registerOwner);
elements.logoutBtn?.addEventListener('click', logout);

document.querySelectorAll('.nav-item').forEach((button) => {
  button.addEventListener('click', async () => {
    const view = button.dataset.view;

    if (view === 'panel' || view === 'inventario' || view === 'gastos' || view === 'empleados') {
      const permissionAllowed = await verifyModulePassword(
        view === 'panel' ? 'Panel principal' : view === 'inventario' ? 'Inventario' : view === 'gastos' ? 'Gastos' : 'Empleados'
      );
      if (!appState.currentUser || !permissionAllowed) {
        return;
      }
    }

    if (appState.currentUser && appState.currentUser.role === 'admin') {
      setActiveView(view);
    } else if (view === 'caja') {
      setActiveView('caja');
    } else {
      showToast('La caja es la única sección pública para empleados.', 'info');
    }
  });
});

document.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-row-btn');
  if (!deleteButton) return;

  const { type, id } = deleteButton.dataset;
  if (type === 'product') deleteInventoryProduct(id);
  if (type === 'expense') deleteExpenseRecord(id);
  if (type === 'employee') deleteEmployeeRecord(id);
});

document.querySelectorAll('.payment-btn').forEach((button) => {
  button.addEventListener('click', () => handlePaymentSelection(button.dataset.payment));
});

elements.addSaleBtn?.addEventListener('click', () => {
  if (!appState.currentShift) {
    showToast('Debe abrir el turno antes de registrar una venta.', 'error');
    return;
  }

  const code = elements.saleProductCode.value.trim();
  const quantity = Number(elements.saleQtyInput.value || 1);
  if (!code || !quantity || quantity < 1) {
    showToast('Ingrese el código y la cantidad válidos.', 'error');
    return;
  }

  const product = state.products.find((item) => item.codigo.toLowerCase() === code.toLowerCase());
  if (!product) {
    showToast('Producto no encontrado.', 'error');
    return;
  }

  if (Number(product.cantidad) < Number(quantity)) {
    showToast(`Stock insuficiente. Solo quedan ${product.cantidad} unidades.`, 'error');
    return;
  }

  appState.pendingSale = { product, quantity, paymentType: 'efectivo' };
  renderSalePreview();
});

elements.registerSaleBtn?.addEventListener('click', createSaleFromPending);
elements.printReceiptBtn?.addEventListener('click', () => printReceipt());
elements.closeCashBtn?.addEventListener('click', closeCashShift);

elements.openCashBtn?.addEventListener('click', () => {
  const doc = elements.employeeDocumentInput.value.trim();
  if (!doc) {
    showToast('Ingrese el documento del empleado para abrir caja.', 'error');
    return;
  }
  openCashShift(doc);
});

elements.activateShiftBtn?.addEventListener('click', () => {
  const doc = elements.activateShiftDocument.value.trim();
  if (!doc) {
    showToast('Ingrese el documento del empleado para activar el turno.', 'error');
    return;
  }
  openCashShift(doc);
});

elements.activateShiftDocument?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    elements.activateShiftBtn.click();
  }
});

elements.inventoryForm?.addEventListener('submit', addInventoryProduct);
elements.expenseForm?.addEventListener('submit', addExpense);
elements.employeeForm?.addEventListener('submit', addEmployee);

boot();

if (isOwnerPage) {
  initializeOwnerPage();
}
