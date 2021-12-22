import { WEBSITE_NAME } from "../constants";
function Footer() {
  return (
    <footer>
      <div className="page-view">
        <span> {WEBSITE_NAME} since 2021. </span>
        <span>
          Unloacking devices IMEI and apps Services. All Rights Reserved. No
          part of this site or its content may be reproduced without the
          permission of the copyright holder. {WEBSITE_NAME} is registered site.
          claimed for copying any content of site.
        </span>
        <span>© {new Date().getFullYear()} Copyright</span>
        <span>
          Developed by: M.Zohaib jozvi & Blueterminal lab{" "}
          <a href="https://www.jozeboy.com">www.jozeboy.com</a>.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
