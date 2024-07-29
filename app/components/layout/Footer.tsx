import { FooterHelp, Link } from "@shopify/polaris";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterHelp align="center">
      © 2022 - {currentYear} Bigly fueled by <Link url="#">imPowered</Link>
    </FooterHelp>
  );
};
