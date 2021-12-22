exports.placed_order_email = function (data) {
  return `
      <!DOCTYPE html>
  <html
    lang="en"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <title></title>
      <meta charset="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  
      <link
        href="https://fonts.googleapis.com/css?family=Lato"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans"
        rel="stylesheet"
        type="text/css"
      />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        @media (max-width: 520px) {
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .fullMobileWidth,
          .row-content {
            width: 100% !important;
          }
  
          .image_block img.big {
            width: auto !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
        }
      </style>
    </head>
    <body
      style="
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #ffffff;
        "
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-1"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #ffffff;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000000;
                          width: 500px;
                        "
                        width="500"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                vertical-align: top;
                                padding-left: 10px;
                                padding-right: 10px;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="50%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="image_block"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding-top: 2px;
                                      width: 100%;
                                      padding-right: 0px;
                                      padding-left: 0px;
                                    "
                                  >
                                    <div style="line-height: 10px">
                                      <p
                                        href="example.com"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #39374e;
                                          font-family: lato;
                                        "
                                        target="_blank"
                                      >
                                        <strong>${data.SITE_NAME}</strong>
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td
                              class="column"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="16.666666666666668%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding-left: 5px;
                                      padding-right: 5px;
                                      padding-top: 9px;
                                      text-align: center;
                                      width: 100%;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #39374e;
                                        direction: ltr;
                                        font-family: Lato, Tahoma, Verdana, Segoe,
                                          sans-serif;
                                        font-size: 13px;
                                        font-weight: normal;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: right;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <a
                                        href="${data.ROOT}/about"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #39374e;
                                        "
                                        target="_blank"
                                        ><strong>About</strong></a
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td
                              class="column"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="16.666666666666668%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding-left: 5px;
                                      padding-right: 5px;
                                      padding-top: 9px;
                                      text-align: center;
                                      width: 100%;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #39374e;
                                        direction: ltr;
                                        font-family: Lato, Tahoma, Verdana, Segoe,
                                          sans-serif;
                                        font-size: 13px;
                                        font-weight: normal;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: right;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <a
                                        href="${data.ROOT}/contact"
                                        rel="noopener"
                                        style="
                                          text-decoration: none;
                                          color: #39374e;
                                        "
                                        target="_blank"
                                        ><strong>Contact</strong></a
                                      ><br />
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                           
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-2"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #ffffff;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000000;
                          width: 500px;
                        "
                        width="500"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                vertical-align: top;
                                padding-top: 15px;
                                padding-bottom: 40px;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="image_block"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding-bottom: 15px;
                                      padding-top: 20px;
                                      width: 100%;
                                      padding-right: 0px;
                                      padding-left: 0px;
                                    "
                                  >
                                    <div align="center" style="line-height: 10px">
                                      <img
                                        alt="2021"
                                        class="fullMobileWidth big"
                                        src="https://firmwaresupport.com/media/site/1-01630924369.png"
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 450px;
                                          max-width: 100%;
                                        "
                                        title="2021"
                                        width="450"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 15px;
                                      padding-right: 15px;
                                      padding-top: 10px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #f9a826;
                                        direction: ltr;
                                        font-family: 'Open Sans', 'Helvetica Neue',
                                          Helvetica, Arial, sans-serif;
                                        font-size: 33px;
                                        font-weight: normal;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: center;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <strong
                                        >Thanks for placing order</strong
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="text_block"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding-bottom: 20px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 10px;
                                    "
                                  >
                                    <div style="font-family: Arial, sans-serif">
                                      <div
                                        style="
                                          font-size: 14px;
                                          font-family: 'Open Sans',
                                            'Helvetica Neue', Helvetica, Arial,
                                            sans-serif;
                                          mso-line-height-alt: 25.2px;
                                          color: #39374e;
                                          line-height: 1.8;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            font-size: 14px;
                                            text-align: center;
                                            mso-line-height-alt: 25.2px;
                                          "
                                        >
                                          <span style="font-size: 14px"
                                          
                                            ><strong>Hey' ${data.firstname}.</strong><br/>
                                            <strong>${data.SITE_NAME}</strong><br/>
                                            <strong>${data.order_name} Order Placed.</strong><br/>
                                            hey you set your order now you can see your order progress on clicking below link!. Thanks for choosing us.
                                            <strong
                                              >Click on button to see progress.</strong
                                            ></span
                                          >
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="button_block"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding-bottom: 15px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 15px;
                                      text-align: center;
                                    "
                                  >
                                    <div align="center">
                                      <a
                                        href="${data.link}"
                                        style="
                                          text-decoration: none;
                                          display: inline-block;
                                          color: #000000;
                                          background-color: #f9a826;
                                          border-radius: 0px;
                                          width: auto;
                                          border-top: 0px solid #8a3b8f;
                                          border-right: 0px solid #8a3b8f;
                                          border-bottom: 0px solid #8a3b8f;
                                          border-left: 0px solid #8a3b8f;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Lato, Tahoma, Verdana,
                                            Segoe, sans-serif;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                        target="_blank"
                                        ><span
                                          style="
                                            padding-left: 30px;
                                            padding-right: 30px;
                                            font-size: 16px;
                                            display: inline-block;
                                            letter-spacing: normal;
                                          "
                                          ><span
                                            style="
                                              font-size: 16px;
                                              line-height: 2;
                                              word-break: break-word;
                                              mso-line-height-alt: 32px;
                                            "
                                            ><span
                                              data-mce-style="font-size: 16px; line-height: 32px;"
                                              style="
                                                font-size: 16px;
                                                line-height: 32px;
                                              "
                                              ><strong>View My Order</strong></span
                                            ></span
                                          ></span
                                        ></a
                                      >
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  
      `;
};
