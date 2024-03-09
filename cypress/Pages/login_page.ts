export class login_page {

    /*
    Used assumed webelement locators
    */
    loginUserName = '//input[@placeholder="Username"]'
    loginPassword = "//input[@placeholder='Password']"
    loginBtn = "//button[@type='submit']"
    homePageTitle = "//*[contains(text(), 'Doctor Finder')]"
    SuccessMessage = "//*[contains(text(), 'Success-Login')]"
    InvalidUserName = '//input[@placeholder="Username"]'
    InvalidMessage = "//*[contains(text(), 'Invalid-Credentials')]"
    InvalidPw = "//input[@placeholder='Password']"
    RequiredFieldsMsg = "//*[contains(text(), 'Required-Fields')]"
    ForgotPassword = "//*[contains(text(), 'Forgot Password')]"
    PasswordResetEmail = "//input[@placeholder='Email']"
    SendButton = "//button[@type='Send']"
    PasswordResetSuccessMsg = "//*[contains(text(), 'Password Reset ')]"


    Navigate(URL: string) {
        cy.visit(URL)
    }

    EnterUserName(UserName: string) {
        cy.xpath(this.loginUserName).type(UserName);
    }

    EnterPassword(Password: string) {
        cy.xpath(this.loginPassword).type(Password);
    }

    LoginToWebSite() {
        cy.xpath(this.loginBtn).click();
    }

    /*
     **Success message should be displayed
     ** Used assertion to verify the success message
    */
    DisplaySuccessLoginMessage() {
        cy.xpath(this.SuccessMessage)
            .should('be.visible')
            .and('contain', 'Success');
    }

    /*
       **Assertion is used to verify the the success of the login functionality
       **User should be on home page after logging
    */
    VerifyLogIn() {
        cy.xpath(this.homePageTitle).should('have.text', 'Doctor Finder');
    }

    EnterInvalidName(InvalidName: string) {
        cy.xpath(this.InvalidUserName).type(InvalidName)
    }

    /*
      **Assertion is used to verify the ivalid credentials message 
    */

    DisplayInvalidCredentialsMessage() {
        cy.xpath(this.InvalidMessage)
            .should('be.visible')
            .and('contain', 'Invalid Credentials');
    }

    EnterInvalidPassword(InvalidPassword: string) {
        cy.xpath(this.InvalidPw).type(InvalidPassword)
    }

    /*
      **Assertion is used to verify the Required fields messages 
   */
    DisplayRequiredFieldsMsg() {
        cy.xpath(this.InvalidMessage)
            .should('be.visible')
            .and('contain', 'Required Fields');
    }

    ClickForgotPassword() {
        cy.xpath(this.ForgotPassword).click()
    }

    EnterPasswordResetEmail(ResetPasswordEmail: string) {
        cy.xpath(this.PasswordResetEmail).type(ResetPasswordEmail);
    }

    ClickSendBtn() {
        cy.xpath(this.SendButton).click();
    }

    /*
      **Assertion is used to verify the Password reset message 
   */
    DisplayPasswordResetSuccessMsg() {
        cy.xpath(this.PasswordResetSuccessMsg)
            .should('be.visible')
            .and('contain', 'A password reset email has been sent');
    }
}