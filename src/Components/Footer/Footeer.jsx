const Footer = () => {
  const footerSections = {
    informazioni: [
      { label: "Chi siamo", href: "#" },
      { label: "Lavora con noi", href: "#" },
      { label: "Investor Relations", href: "#" },
      { label: "Notizie", href: "#" },
    ],
    supporto: [
      { label: "Centro assistenza", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Account", href: "#" },
      { label: "Contattaci", href: "#" },
    ],
    legale: [
      { label: "Privacy Policy", href: "#" },
      { label: "Termini di servizio", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Informativa legale", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: "f", title: "Facebook", href: "#" },
    { icon: "📷", title: "Instagram", href: "#" },
    { icon: "𝕏", title: "Twitter", href: "#" },
    { icon: "▶", title: "YouTube", href: "#" },
  ];

  const bottomLinks = [
    { label: "Preferenze cookie", href: "#" },
    { label: "Informazioni aziendali", href: "#" },
    { label: "Garanzie legali", href: "#" },
    { label: "Accessibilità", href: "#" },
  ];

  const styles = {
    footer: {
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)",
      color: "#ffffff",
      padding: "50px 20px 30px",
      borderTop: "2px solid rgba(220, 53, 69, 0.3)",
    },
    footerContent: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    footerTop: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      marginBottom: "40px",
    },
    sectionTitle: {
      color: "#dc3545",
      fontSize: "18px",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      marginBottom: "12px",
    },
    link: {
      color: "#cccccc",
      textDecoration: "none",
      fontSize: "14px",
      transition: "color 0.3s ease",
    },
    socialLinks: {
      display: "flex",
      gap: "15px",
      marginTop: "15px",
    },
    socialLink: {
      width: "40px",
      height: "40px",
      background: "rgba(220, 53, 69, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#dc3545",
      textDecoration: "none",
      transition: "all 0.3s ease",
      fontWeight: "bold",
    },
    footerBottom: {
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      paddingTop: "25px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    },
    logo: {
      fontSize: "28px",
      fontWeight: "bold",
      fontStyle: "italic",
      color: "#dc3545",
    },
    bottomLinks: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    },
    bottomLink: {
      color: "#999",
      textDecoration: "none",
      fontSize: "13px",
      transition: "color 0.3s ease",
    },
    copyright: {
      color: "#666",
      fontSize: "13px",
      width: "100%",
      textAlign: "center",
      marginTop: "20px",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        {/* Footer Top */}
        <div style={styles.footerTop}>
          {/* Informazioni */}
          <div>
            <h3 style={styles.sectionTitle}>Informazioni</h3>
            <ul style={styles.list}>
              {footerSections.informazioni.map((link, index) => (
                <li key={index} style={styles.listItem}>
                  <a
                    href={link.href}
                    style={styles.link}
                    onMouseEnter={(e) => (e.target.style.color = "#dc3545")}
                    onMouseLeave={(e) => (e.target.style.color = "#cccccc")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Supporto */}
          <div>
            <h3 style={styles.sectionTitle}>Supporto</h3>
            <ul style={styles.list}>
              {footerSections.supporto.map((link, index) => (
                <li key={index} style={styles.listItem}>
                  <a
                    href={link.href}
                    style={styles.link}
                    onMouseEnter={(e) => (e.target.style.color = "#dc3545")}
                    onMouseLeave={(e) => (e.target.style.color = "#cccccc")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legale */}
          <div>
            <h3 style={styles.sectionTitle}>Legale</h3>
            <ul style={styles.list}>
              {footerSections.legale.map((link, index) => (
                <li key={index} style={styles.listItem}>
                  <a
                    href={link.href}
                    style={styles.link}
                    onMouseEnter={(e) => (e.target.style.color = "#dc3545")}
                    onMouseLeave={(e) => (e.target.style.color = "#cccccc")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 style={styles.sectionTitle}>Seguici</h3>
            <div style={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  title={social.title}
                  style={styles.socialLink}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#dc3545";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(220, 53, 69, 0.2)";
                    e.target.style.color = "#dc3545";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>
          <div style={styles.logo}>MasFlix</div>

          <div style={styles.bottomLinks}>
            {bottomLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={styles.bottomLink}
                onMouseEnter={(e) => (e.target.style.color = "#dc3545")}
                onMouseLeave={(e) => (e.target.style.color = "#999")}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={styles.copyright}>
            © 2025 MasFlix. Tutti i diritti riservati.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
