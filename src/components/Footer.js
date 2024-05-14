const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="footer">
      <p className="footer__text">
        © {currentYear} | Reyhan Taze and Yegor Nino - For Educational Purposes Only.
      </p>
    </footer>
  )
}

export default Footer