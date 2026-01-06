import { useEffect } from "react";
import {
  API_BASE_URLV4,
  AUTHENTICATE_SOLR,
  solarsearch,
} from "@/config/serverApiConfig";
//custom
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//custom end

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useLanguage from "@/locale/useLanguage";

//import { Form, Button } from 'antd';

import { login } from "@/redux/auth/actions";

import { selectAuth } from "@/redux/auth/selectors";

//import avatar from './../custom/image/login/avatar.png';
//import sideimage from './../custom/image/login/side.jpg';
//import './../custom/CSS/signin.css';

//custom css
import LoginBg from "@/style/arcstyle/images/Picture1.png";
import Logo from "@/style/arcstyle/images/logo.svg";
import Spinner from "react-bootstrap/Spinner";

import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi2";
// import MatomoTracker from "@/components/MatomoTracker/Matomotracer";
//import decode   from 'jwt-decode';

//custom end

const LoginPage = () => {
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();

  const navigate = useNavigate();
  // const size = useSize();

  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login({ loginData: values }));
  };

  //custom

  //custom end

  const FormContainer = () => {
    const [authdta, setauthdta] = useState("");
    const { isLoading, isSuccess } = useSelector(selectAuth);
    const [formErrors, setFormErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ispageLoading, setpageLoading] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
    const validateForm = () => {
      const errors = {};
      if (!email) {
        errors.email = "Email is required";
      }
      if (!password) {
        errors.password = "Password is required";
      }
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };

    useEffect(() => {
      console.log("LoginPage");
      console.log(selectAuth);
      console.log(isSuccess);

      if (isSuccess) console.log("Success");
      //   navigate("/");
      //console.log(JSON.stringify(authdta));
      //if (authdta)
      //    console.log("Success")
      //    navigate('/');
    }, [isSuccess]);

    const [values, setValues] = useState({
      // email: "vannamalai@innospire.com",
      // email: "sravishankar@innospire.com",
      // password: "Password@123",
      email: "",
      password: "",
      error: "",
      loading: false,
      redirectToReferrer: false,
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    //console.log(email + "  Pass: " + password);

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      //   console.log(values.email);
      //   console.log(values.password);
    };

    const clickSubmit = async (event) => {
      event.preventDefault();
      const isValid = validateForm();
      window.localStorage.setItem("Loggedinuseemailid", email);
      if (isValid) {
        setpageLoading(true);
        const credentials = {
          email: email,
          password: password,
        };

        try {
          const response = await fetch(API_BASE_URLV4 + "v1/identity/tokens", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
          }
          if (solarsearch) {
            const Authenticate = AUTHENTICATE_SOLR;
            const SolrResponse = await fetch(
              "https://arcsolr-qa.archarina.com/api/Authenticate",
              {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(Authenticate),
              }
            );
            if (!SolrResponse.ok) {
              throw new Error("Network response was not ok");
            }
            const ResponseData = await SolrResponse.json();
            console.log(ResponseData);

            console.log(ResponseData.data);
            if (ResponseData) {
              // Decode the token
              //  const decodedToken = decode(data?.token);
              const Result = ResponseData;
              console.log(Result);
              const tokenString = Result?.token;
              console.log(tokenString);
              window.localStorage.setItem(
                "SolrToken",
                JSON.stringify({ tokenString })
              );
            }
          }
          const data = await response.json();
          console.log(data.data);
          if (data.data) {
            // Decode the token
            //  const decodedToken = decode(data?.token);
            const Result = data.data;
            console.log(Result);
            const tokenString = Result?.token;
            console.log(tokenString);
            const parts = Result?.token.split(".");
            const encodedPayload = parts[1];

            // Decode the payload
            const decodedPayload = JSON.parse(atob(encodedPayload));
            const auth_state =
              '{"current":' +
              JSON.stringify(decodedPayload) +
              ',"isLoggedIn":true,"isLoading":false,"isSuccess":true}';

            const settings =
              '{"quote_settings":{"quote_show_product_tax":false,"quote_status":["draft","pendding","sent","negotiation","accepted","declined","cancelled"],"quote_pdf_footer":"Quote was created on a computer and is valid without the signature and seal","quote_load_default_client":false},"offer_settings":{"offer_show_product_tax":false,"offer_status":["draft","pendding","sent","negotiation","accepted","declined","cancelled"],"offer_load_default_client":false,"offer_pdf_footer":"Offer was created on a computer and is valid without the signature and seal"},"money_format_settings":{"currency":"usd","currency_position":"before","decimal_sep":".","thousand_sep":",","zero_format":false,"currency_symbol":"$","cent_precision":2},"lead_settings":{"lead_source":["self checking","sales lead","recomendation","facebook","instagram","tiktok","youtube","blog","linkedin","newsletter","website","twitter"],"offer_default_lead_type":"company","lead_type":["person","company"],"lead_status":["draft","new","reached","waiting","in negosation","won","loose"],"lead_category":["Corporate","person","startup","small company","services business","retails","cafe & restaurant"]},"invoice_settings":{"invoice_load_default_client":false,"invoice_pdf_footer":"Invoice was created on a computer and is valid without the signature and seal","invoice_status":["draft","pending","sent","received","refund","cancelled","on hold"],"invoice_show_product_tax":false},"finance_settings":{"last_payment_number":1,"quote_prefix":"qot-","last_quote_number":27,"offer_prefix":"ofr-","last_invoice_number":114,"last_offer_number":20,"invoice_prefix":"inv-","payment_prefix":"pym-","current_invoice_year":2023,"current_quote_year":2023,"current_offer_year":2023},"company_settings":{"company_has_mutli_branch":false,"company_logo":"public/uploads/setting/idurar-app-large-s5vg9.png","company_website":"www.idurarapp.com","company_tax_number":"91231255234","company_name":"IDURAR","company_state":"Oran","company_reg_number":"00001231421","company_icon":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","company_address":"25 , Rue de G","company_country":"Algeria","company_vat_number":"91231255234","company_email":"support@idurarapp123.com","company_phone":"+1 345234654","company_cell":"+1 345234654"},"client_settings":{"client_type":["people","company"],"client_category":["Corporate","startup","small company","services business","retails","cafe & restaurant"],"quote_default_client_type":"company","pos_default_client_type":"people","client_status":["active","new","premium","unactive"],"client_source":["self checking","sales lead","recomendation","facebook","instagram","tiktok","youtube","blog","linkedin","newsletter","website","twitter"],"invoice_default_client_type":"company","pos_default_client":"609e0057246f2359b0c4c31f"},"app_settings":{"idurar_server_url":"https://erp-crm.idurarapp.com/","idurar_base_url":"https://demo-erp-crm.idurarapp.com/","idurar_app_logo":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","idurar_app_v":false,"idurar_app_language":"en_us","idurar_app_name":"IDURAR ERP/CRM","idurar_app_email":"noreply123@idurarappp.com","idurar_app_icon":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","idurar_app_t":"free_trial","idurar_registration_allowed":true,"idurar_app_d":"","idurar_app_date_format":"DD/MM/YYYY"},"email_settings":{"email_reply_to":"reply@idurarapp.com","email_domain":"idurarapp.com","email_from":"IDURAR ERP CRM"}}\r\n';
            console.log(auth_state);
            window.localStorage.setItem("auth", auth_state);
            window.localStorage.setItem(
              "token",
              JSON.stringify({ tokenString })
            );
            window.localStorage.setItem("settings", settings);
            window.localStorage.removeItem("isLogout");
            setauthdta(auth_state);
            dispatch(login({ loginData: true }));
          } else {
            // not validated show error message
            setFormErrors({
              authentication:
                "Authentication failed. Please check your credentials.",
            });
            setpageLoading(false);
          }
        } catch (error) {
          setFormErrors({
            authentication:
              "Authentication failed. Please check your credentials.",
          });
          setpageLoading(false);
        } finally {
          setpageLoading(false);
        }
      }
    };

    const clickSubmitLocal = (event) => {
      const auth_state =
        '{"current":{"_id":"657d4292ae2e4dfcd9408f5b","name":"admin","surname":"demo","role":"staff","email":"admin@demo.com"},"isLoggedIn":true,"isLoading":false,"isSuccess":true}';

      const settings = "";
      // const settings = '{"quote_settings":{"quote_show_product_tax":false,"quote_status":["draft","pendding","sent","negotiation","accepted","declined","cancelled"],"quote_pdf_footer":"Quote was created on a computer and is valid without the signature and seal","quote_load_default_client":false},"offer_settings":{"offer_show_product_tax":false,"offer_status":["draft","pendding","sent","negotiation","accepted","declined","cancelled"],"offer_load_default_client":false,"offer_pdf_footer":"Offer was created on a computer and is valid without the signature and seal"},"money_format_settings":{"currency":"usd","currency_position":"before","decimal_sep":".","thousand_sep":",","zero_format":false,"currency_symbol":"$","cent_precision":2},"lead_settings":{"lead_source":["self checking","sales lead","recomendation","facebook","instagram","tiktok","youtube","blog","linkedin","newsletter","website","twitter"],"offer_default_lead_type":"company","lead_type":["person","company"],"lead_status":["draft","new","reached","waiting","in negosation","won","loose"],"lead_category":["Corporate","person","startup","small company","services business","retails","cafe & restaurant"]},"invoice_settings":{"invoice_load_default_client":false,"invoice_pdf_footer":"Invoice was created on a computer and is valid without the signature and seal","invoice_status":["draft","pending","sent","received","refund","cancelled","on hold"],"invoice_show_product_tax":false},"finance_settings":{"last_payment_number":1,"quote_prefix":"qot-","last_quote_number":27,"offer_prefix":"ofr-","last_invoice_number":114,"last_offer_number":20,"invoice_prefix":"inv-","payment_prefix":"pym-","current_invoice_year":2023,"current_quote_year":2023,"current_offer_year":2023},"company_settings":{"company_has_mutli_branch":false,"company_logo":"public/uploads/setting/idurar-app-large-s5vg9.png","company_website":"www.idurarapp.com","company_tax_number":"91231255234","company_name":"IDURAR","company_state":"Oran","company_reg_number":"00001231421","company_icon":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","company_address":"25 , Rue de g","company_country":"algeria","company_vat_number":"91231255234","company_email":"support@idurarapp123.com","company_phone":"+1 345234654","company_cell":"+1 345234654"},"client_settings":{"client_type":["people","company"],"client_category":["Corporate","startup","small company","services business","retails","cafe & restaurant"],"quote_default_client_type":"company","pos_default_client_type":"people","client_status":["active","new","premium","unactive"],"client_source":["self checking","sales lead","recomendation","facebook","instagram","tiktok","youtube","blog","linkedin","newsletter","website","twitter"],"invoice_default_client_type":"company","pos_default_client":"609e0057246f2359b0c4c31f"},"app_settings":{"idurar_server_url":"https://erp-crm.idurarapp.com/","idurar_base_url":"https://demo-erp-crm.idurarapp.com/","idurar_app_logo":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","idurar_app_v":false,"idurar_app_language":"en_us","idurar_app_name":"IDURAR erp/crm","idurar_app_email":"noreply123@idurarappp.com","idurar_app_icon":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","idurar_app_t":"free_trial","idurar_registration_allowed":true,"idurar_app_d":"","idurar_app_date_format":"dd/mm/yyyy"},"email_settings":{"email_reply_to":"reply@idurarapp.com","email_domain":"idurarapp.com","email_from":"IDURAR ERP CRM"}}\r\n';

      window.localStorage.setItem("auth", auth_state);

      window.localStorage.setItem("settings", settings);

      window.localStorage.removeItem("isLogout");

      setauthdta(auth_state);
      dispatch(login({ loginData: true }));

      // navigate('/');
    };

    // const loggedinusermailid =
    //   window.localStorage.getItem("Loggedinuseemailid");
    // console.log("loggedinusermailid", loggedinusermailid);

    return (
      <section className="login-page">
        {/* {loggedinusermailid && <MatomoTracker loggedInUserName={email} />} */}
        {ispageLoading && (
          <>
            <div className="login-loading-screen">
              <Spinner animation="border" />
              <p>Loading...</p>
            </div>
          </>
        )}
        <img className="bg-image" src={LoginBg} alt="" />
        <Container>
          <Row className="justify-content-between align-items-end">
            <Col xxl={5} xl={5}>
              <div className="content">
                <h3>ArcTicketing Proto</h3>
                <h5>
                  A single integrated platform to run every aspect of your
                  Business
                </h5>
                <p>
                  A single integrated platform to run every aspect of your
                  BusinessA single integrated platform to run every aspect of
                  your Business
                </p>
              </div>
            </Col>
            <Col xxl={6} xl={5}>
              <div className="signin-form">
                <img className="logo" src={Logo} alt="" />
                <p className="login-title">Login</p>
                <Form onSubmit={clickSubmit}>
                  <Form.Group
                    className="form-group username-div"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>User Name</Form.Label>
                    <div className="input-div">
                      <AiOutlineUser />
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        autoComplete="true"
                      />
                    </div>
                    {formErrors.email && (
                      <span className="error-message">{formErrors.email}</span>
                    )}
                  </Form.Group>
                  <Form.Group
                    className="form-group password-div"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Password</Form.Label>
                    <div className="input-div">
                      <HiOutlineKey />
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        autoComplete="true"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        className="password-toggle-btn"
                      >
                        {passwordVisible ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </span>
                    </div>
                    {formErrors.password && (
                      <span className="error-message">
                        {formErrors.password}
                      </span>
                    )}
                  </Form.Group>
                  {formErrors.authentication && (
                    <span className="error-message">
                      {formErrors.authentication}
                    </span>
                  )}

                  <Form.Group
                    className="remember-forget"
                    controlId="formBasicCheckbox"
                  >
                    <Form.Check type="checkbox" label="Remember Password" />
                    <button>Forget Password?</button>
                  </Form.Group>
                  {/* <Button className="login-btn" onClick={clickSubmitLocal}>
                    Submit
                  </Button> */}
                  <Button className="login-btn" type="submit">
                    Submit
                  </Button>
                  <p>
                    Don't have account? <Link to="/">Sign up</Link>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  };

  return <FormContainer />;
  // return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign in" />;
};

//const FormContainer = () => {
//    return (

//        <div className="isc-app-nav-container">
//            <header className="p-1 fixed-top  nav-top bg-dark">

//                <div className="row display-flex mt-3">
//                    <div className="col-sm-8 col-xs-10 col-md-4 offset-md-2 offset-sm-2 offset-xs-1 py-4 px-3 rounded-left" id="login-intro-form">
//                        <h2 className="text-center text-white h2 font-weight-bold mt-2"></h2>
//                        <div className="login-account-wall p-4 mb-2" >
//                            <img className="rounded-circle mx-auto d-block" src="" alt="" />
//                            <form >
//                                <div className="form-group mt-3">
//                                    <label className="text-white font-weight-bold">Email</label>
//                                    <input
//                                        onChange={handleChange("email")}
//                                        type="email"
//                                        className="form-control"
//                                        value={email}
//                                    />
//                                </div>

//                                <div className="form-group mt-3">
//                                    <label className="text-white font-weight-bold">Password</label>
//                                    <input
//                                        onChange={handleChange("password")}
//                                        type="password"
//                                        className="form-control"
//                                        value={password}
//                                    />
//                                </div>
//                                <button style={{ marginTop: '10px' }} onClick={clickSubmit} className="btn btn-success btn-block rounded font-weight-bold text-center">
//                                    Submit
//                                </button>
//                            </form>
//                            <div className="text-center">
//                                <span className="text-center d-block text-danger font-weight-bold text-italic">or</span>
//                                <Link to="/signup" className="text-white">Create an account </Link>
//                            </div>
//                        </div>

//                    </div>
//                    <div className="col-sm-8 col-xs-10 col-md-4 rounded-right py-4 px-3" id="login-intro">
//                        <h2 className="login-login-title text-center mt-2 h2">Welcome to Platform Web T500</h2>
//                        {/*<img className="img-fluid img-rounded" src="" alt="signup" />*/}
//                        <p className="text-center text-warning">We Are Happy to see you here. We are working to provide the best services to you.</p>
//                    </div>
//                </div>
//            </header>
//        </div>
//    );
//};

//import LoginForm from '@/forms/LoginForm';
//import Loading from '@/components/Loading';
//import AuthModule from '@/modules/AuthModule';

//const LoginPage = () => {
//  const translate = useLanguage();
//  const { isLoading, isSuccess } = useSelector(selectAuth);
//  const navigate = useNavigate();
//  // const size = useSize();

//  const dispatch = useDispatch();
//  const onFinish = (values) => {
//    dispatch(login({ loginData: values }));
//  };

//  useEffect(() => {
//    if (isSuccess) navigate('/');
//  }, [isSuccess]);

//  const FormContainer = () => {
//    return (
//      <Loading isLoading={isLoading}>
//        <Form
//          layout="vertical"
//          name="normal_login"
//          className="login-form"
//          initialValues={{
//            remember: true,
//          }}
//          onFinish={onFinish}
//        >
//          <LoginForm />
//          <Form.Item>
//            <Button
//              type="primary"
//              htmlType="submit"
//              className="login-form-button"
//              loading={isLoading}
//              size="large"
//            >
//              {translate('Log in')}
//            </Button>
//            {translate('Or')} <a href="/register">{translate('register now')}!</a>
//          </Form.Item>
//        </Form>
//      </Loading>
//    );
//  };

//  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign in" />;
//};

export default LoginPage;
