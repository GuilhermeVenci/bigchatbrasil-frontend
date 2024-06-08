const logoutClient = async () => {
  const response = await fetch('/logout', {
    method: 'POST',
  });

  if (response.ok) {
    // Redirecionar para a página de login
    window.location.href = '/login';
  } else {
    console.error('Failed to logout');
  }
};

export default logoutClient;
