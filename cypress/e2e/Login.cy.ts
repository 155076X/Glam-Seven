import { login_page } from "../Pages/login_page"; // Import LoginPage class from login_page module

// Instantiate LoginPage object
const loginPage = new login_page();

describe('Login Page', () => {
    beforeEach(() => {
        cy.fixture('login').as('LoginData'); // Load login fixture
        
        // Mock login endpoint
        cy.intercept('POST', '/login', { fixture: 'login.json' }).as('loginRequest');
    });

    it.only('TS_01 Verify that the user is able to login with valid credentials', function() {
        const data = this.LoginData; // Access fixture data using 'this'
        loginPage.Navigate(data.URL);
        loginPage.EnterUserName(data.UserName);
        loginPage.EnterPassword(data.Password);
        loginPage.LoginToWebSite();
        loginPage.DisplaySuccessLoginMessage();
        loginPage.VerifyLogIn();
    });

    it('TS_02 Verify that the user is not able to login with Invalid username and valid password', function() {
        const data = this.LoginData;
        loginPage.Navigate(data.URL);
        loginPage.EnterInvalidName(data.InvalidName);
        loginPage.EnterPassword(data.Password);
        loginPage.LoginToWebSite();
        loginPage.DisplayInvalidCredentialsMessage();
    });

    it('TS_03 Verify that the user is not able to login with valid username and Invalid password', function() {
        const data = this.LoginData;
        loginPage.Navigate(data.URL);
        loginPage.EnterUserName(data.UserName);
        loginPage.EnterInvalidPassword(data.InvalidPassword);
        loginPage.LoginToWebSite();
        loginPage.DisplayInvalidCredentialsMessage();
    });

    it('TS_04 Verify that the user is not able to login with invalid username and invalid password', function() {
        const data = this.LoginData;
        loginPage.Navigate(data.URL);
        loginPage.EnterInvalidName(data.InvalidName);
        loginPage.EnterInvalidPassword(data.InvalidPassword);
        loginPage.LoginToWebSite();
        loginPage.DisplayInvalidCredentialsMessage();
    });

    it('TS_05 Verify that the user is not able to login when both username and password fields are empty.', function() {
        const data = this.LoginData;
        loginPage.Navigate(data.URL);
        loginPage.LoginToWebSite();
        loginPage.DisplayRequiredFieldsMsg();
    });

    it('TS_06 Click on the Forgot password link and verify user is able to reset the Password ', function() {
        const data = this.LoginData;
        loginPage.Navigate(data.URL);
        loginPage.ClickForgotPassword();
        loginPage.EnterPasswordResetEmail(data.ResetPasswordEmail);
        loginPage.ClickSendBtn();
        loginPage.DisplayPasswordResetSuccessMsg();
    });
});
