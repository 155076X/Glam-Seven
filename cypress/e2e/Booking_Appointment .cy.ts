import { login_page } from "../Pages/login_page"; // Import LoginPage class from login_page module
import { Booking_Appoinment_Page } from "../Pages/Booking_Appoinment_Page"; // Import LoginPage class from login_page module


// Instantiate LoginPage object
const loginPage = new login_page();
const BookingAppoinment = new Booking_Appoinment_Page();

describe('Login Page', () => {
    beforeEach(() => {

        cy.fixture('login').as('LoginData'); // Load login fixture
        cy.fixture('appointment').as('appointmentData'); // Load appointment fixture
        cy.fixture('available-times').as('availableTimesData'); // Load available times fixture


        // login endpoint
        cy.intercept('POST', '/login', { fixture: 'login.json' }).as('loginRequest');

        // appointment endpoint
        cy.intercept('POST', '/appointment', { fixture: 'appointment.json' }).as('appointmentRequest');

        // available-times endpoint
        cy.intercept('GET', '/available-times', { fixture: 'available-times.json' }).as('availableTimesRequest');
    });

    it('TS_01 Verify that the user is able to see all the available Doctor lists on the Booking Appointment page', function () {
        const data = this.LoginData; // Access fixture data using 'this'
        loginPage.Navigate(data.URL);
        loginPage.EnterUserName(data.UserName);
        loginPage.EnterPassword(data.Password);
        loginPage.LoginToWebSite();
        loginPage.DisplaySuccessLoginMessage();
        loginPage.VerifyLogIn();
        BookingAppoinment.ClickBookingAppoinmentBtn();
        BookingAppoinment.VerifyBookingAppoinmentPage();
        BookingAppoinment.CaptureTheDoctorList();
    });

    it('TS_02 Verify that the user able to select a doctor from the list ', function () {
        const data = this.LoginData;
        const appoinmentdata = this.appointmentData;
        loginPage.Navigate(data.URL);
        loginPage.EnterUserName(data.UserName);
        loginPage.EnterPassword(data.Password);
        loginPage.LoginToWebSite();
        BookingAppoinment.ClickBookingAppoinmentBtn();
        BookingAppoinment.VerifyBookingAppoinmentPage();
        BookingAppoinment.CaptureTheDoctorList();
        BookingAppoinment.EnterSearchText(appoinmentdata.SearchText);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.VerifyFilterResults();
        BookingAppoinment.ClickOnCheckBoxToSelectDoctor();
        BookingAppoinment.ClickOnOkBtn();
        BookingAppoinment.CaptureSelectedDoctorDaysHrs();


    });

    it('TS_03 Verify that the user is able to select the available time slot of the relevant doctor ', function () {
        const data = this.LoginData;
        const appoinmentdata = this.appointmentData;
        const Timedata = this.availableTimesData;
        loginPage.Navigate(data.URL);
        loginPage.EnterUserName(data.UserName);
        loginPage.EnterPassword(data.Password);
        loginPage.LoginToWebSite();
        BookingAppoinment.ClickBookingAppoinmentBtn();
        BookingAppoinment.VerifyBookingAppoinmentPage();
        BookingAppoinment.CaptureTheDoctorList();
        BookingAppoinment.EnterSearchText(appoinmentdata.SearchText);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.VerifyFilterResults();
        BookingAppoinment.ClickOnCheckBoxToSelectDoctor();
        BookingAppoinment.ClickOnOkBtn();
        BookingAppoinment.CaptureSelectedDoctorDaysHrs();
        BookingAppoinment.SelectConvenientDayHours();
        BookingAppoinment.ClickOnGoToTimeSlotsBtn();
        BookingAppoinment.SearchTimeSlotsTextBox(Timedata.startTime);
        BookingAppoinment.SearchTimeSlotsTextBox(Timedata.endTime);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.AvailableButtonIsPresent();

    });

    it('TS_04 Verify that the user is able to see the Reserve Appointment form when clicking on the ‘Reserve Appointment’ button ', function () {
        const data = this.LoginData;
        const appoinmentdata = this.appointmentData;
        const Timedata = this.availableTimesData;
        loginPage.Navigate(data.URL);
        loginPage.EnterUserName(data.UserName);
        loginPage.EnterPassword(data.Password);
        loginPage.LoginToWebSite();
        BookingAppoinment.ClickBookingAppoinmentBtn();
        BookingAppoinment.VerifyBookingAppoinmentPage();
        BookingAppoinment.CaptureTheDoctorList();
        BookingAppoinment.EnterSearchText(appoinmentdata.SearchText);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.VerifyFilterResults();
        BookingAppoinment.ClickOnCheckBoxToSelectDoctor();
        BookingAppoinment.ClickOnOkBtn();
        BookingAppoinment.CaptureSelectedDoctorDaysHrs();
        BookingAppoinment.SelectConvenientDayHours();
        BookingAppoinment.ClickOnGoToTimeSlotsBtn();
        BookingAppoinment.SearchTimeSlotsTextBox(Timedata.startTime);
        BookingAppoinment.SearchTimeSlotsTextBox(Timedata.endTime);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.AvailableButtonIsPresent();
        BookingAppoinment.ClickReserveAppointment();
        BookingAppoinment.VerifyReserveAppoinmentPage();
    });

    it('TS_05 Verify that the user is able to fill in the ‘Reserve Appointment’ form ', function () {
        const data = this.LoginData;
        const appoinmentdata = this.appointmentData;
        const Timedata = this.availableTimesData;
        loginPage.Navigate(data.URL);
        loginPage.EnterUserName(data.UserName);
        loginPage.EnterPassword(data.Password);
        loginPage.LoginToWebSite();
        BookingAppoinment.ClickBookingAppoinmentBtn();
        BookingAppoinment.VerifyBookingAppoinmentPage();
        BookingAppoinment.CaptureTheDoctorList();
        BookingAppoinment.EnterSearchText(appoinmentdata.SearchText);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.VerifyFilterResults();
        BookingAppoinment.ClickOnCheckBoxToSelectDoctor();
        BookingAppoinment.ClickOnOkBtn();
        BookingAppoinment.CaptureSelectedDoctorDaysHrs();
        BookingAppoinment.SelectConvenientDayHours();
        BookingAppoinment.ClickOnGoToTimeSlotsBtn();
        BookingAppoinment.SearchTimeSlotsTextBox(Timedata.startTime);
        BookingAppoinment.SearchTimeSlotsTextBox(Timedata.endTime);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.AvailableButtonIsPresent();
        BookingAppoinment.ClickReserveAppointment();
        BookingAppoinment.VerifyReserveAppoinmentPage();
        BookingAppoinment.EnterNameforAppoinment(appoinmentdata.Name);
        BookingAppoinment.EnterPhoneNumforAppoinment(appoinmentdata.TelephoneNumber);
        BookingAppoinment.EnterPatientReason(appoinmentdata.Reason);
        BookingAppoinment.PressBookBtn();
        BookingAppoinment.DisplayAppoinmentSuccessMessage();
    });
    it('TS_06 Appoinment Unavailability ', function () {
        const data = this.LoginData;
        const appoinmentdata = this.appointmentData;
        const Timedata = this.availableTimesData;
        loginPage.Navigate(data.URL);
        loginPage.EnterUserName(data.UserName);
        loginPage.EnterPassword(data.Password);
        loginPage.LoginToWebSite();
        BookingAppoinment.ClickBookingAppoinmentBtn();
        BookingAppoinment.VerifyBookingAppoinmentPage();
        BookingAppoinment.CaptureTheDoctorList();
        BookingAppoinment.EnterSearchText(appoinmentdata.SearchText);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.VerifyFilterResults();
        BookingAppoinment.ClickOnCheckBoxToSelectDoctor();
        BookingAppoinment.ClickOnOkBtn();
        BookingAppoinment.CaptureSelectedDoctorDaysHrs();
        BookingAppoinment.SelectConvenientDayHours();
        BookingAppoinment.ClickOnGoToTimeSlotsBtn();
        BookingAppoinment.SearchTimeSlotsTextBox(Timedata.startTime);
        BookingAppoinment.SearchTimeSlotsTextBox(Timedata.endTime);
        BookingAppoinment.ClickOnSearchBtn();
        BookingAppoinment.AvailableButtonIsPresent();

    });



});

