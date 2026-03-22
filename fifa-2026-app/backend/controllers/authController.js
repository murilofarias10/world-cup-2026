const DEMO_USER = {
  email: 'admin@fifa2026.com',
  password: 'worldcup2026',
};

export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    return res.json({
      success: true,
      user: { email: DEMO_USER.email, name: 'Admin' },
      token: 'demo-jwt-token-placeholder',
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
