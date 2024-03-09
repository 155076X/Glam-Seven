export class Booking_Appoinment_Page {

    /*
    Used assumed webelement locators
    */
    
    BookingAppoinmentBtn = "//button[@name='Booking Appoinment']"
    BookingPageTitle = "//*[contains(text(), 'Booking Appoinment')]"
    BookingPageSearchTextBox = "//*[contains(text(), 'Search TextBox')]"
    BookingPageSearchButton = "//button[@name='Search']"
    SearchFilterResults = "//*[contains(text(), 'Doctor 1')]"
    checkBox ="input [@type='checkbox']"
    OKButton="//button[@name='OK']"
    ConvenienttDayHr="input [@type='checkbox1']"
    GoToTimeSlot ="//button[@name='GoToTimeSlots']"
    TimeSlotsTextBox ="//*[contains(text(), 'Search Time Slot TextBox')]"
    ReserveAppointment = "//button[@name='Reserve appoinment']"
    ReserveAppoinmentPageTitle = "//*[contains(text(), 'Reserve Appoinment')]"
    PatientName = '//input[@placeholder="name"]'
    PatientTelephoneNumber = '//input[@placeholder="TelephoneNumber"]'
    PatientReason = "//*[contains(text(), 'Reason')]"
    BookButton ="//*[contains(text(), 'Reason')]"
    AppoinmentSuccessMessage = "//*[contains(text(), 'Success')]"


    Navigate(URL: string) {
        cy.visit(URL)
    }
/*
    ** This method is Used to capture the Booking Appoinment button
    */
    ClickBookingAppoinmentBtn() {
        cy.xpath(this.BookingAppoinmentBtn).click();
    }

    /*
       **Assertion is used to verify the the title of the Booking Appoinment page
    */
       VerifyBookingAppoinmentPage() {
        cy.xpath(this.BookingPageTitle).should('have.text', 'Booking Appoinment');
    }

    /*
    ** This method Used to capture and assert the doctor list items
    */
    CaptureTheDoctorList(){
        // Assuming the list items are contained within a specific class 
        // Assert that there are more than 0 list items
        cy.get('.list-item').should('have.length.greaterThan', 0); 
        // Capture and assert the text of each list item
        cy.get('.list-item').each(($item, index, $list) => {
        // Perform assertions or other actions on each list item
        cy.wrap($item).should('contain.text', `Doctor list ${index + 1}`);
        });
    }

    EnterSearchText(SearchText: string) {
        cy.xpath(this.BookingPageSearchTextBox).type(SearchText);
    }

    ClickOnSearchBtn(){
        cy.xpath(this.BookingPageSearchButton).click();
    }

    VerifyFilterResults() {
        cy.xpath(this.SearchFilterResults)
            .should('be.visible')
            .and('contain', 'Doctor 1');
    }

    ClickOnCheckBoxToSelectDoctor(){
        cy.xpath(this.checkBox).click();
    }

    ClickOnOkBtn(){
        cy.xpath(this.OKButton).click();
    }
    /*
    ** This method Used to capture Selected doctor's Working days and Working Hours
    */
    CaptureSelectedDoctorDaysHrs(){
    
            // Assuming each doctor item is contained within a specific class 
            cy.get('.doctor-item').should('have.length.greaterThan', 0); // Assert that there are more than 0 doctor items
            
            // Capture and assert the text of each doctor item
            cy.get('.doctor-item').each(($doctorItem, index) => {
                // Capture doctor's name
                const doctorName = $doctorItem.find('.doctor-name').text();
        
                // Capture doctor's working days
                const workingDays = $doctorItem.find('.working-days').text();
        
                // Capture doctor's working hours
                const workingHours = $doctorItem.find('.working-hours').text();
        
                // Log doctor's information
                cy.log(`Doctor ${index + 1}: ${doctorName}, Working Days: ${workingDays}, Working Hours: ${workingHours}`);
            });
        }

        SelectConvenientDayHours(){
            cy.xpath(this.ConvenienttDayHr).click();

        }
        ClickOnGoToTimeSlotsBtn(){
            cy.xpath(this.GoToTimeSlot).click();
        }

        SearchTimeSlotsTextBox(startTime : string){
            cy.xpath(this.TimeSlotsTextBox).type(startTime);
        }

        
        /*
        **should only allow checkbox selection if "Available" button is present available time slot
        */
           AvailableButtonIsPresent(){  
         cy.get('#available-button').then(($button) => {
                    if ($button.length > 0) {
                        // "Available" button is present, so checkbox selection should be allowed
                        cy.get('#checkbox').check();
                        cy.get('#checkbox').should('be.checked');
                    } else {
                        // "Available" button is not present, so checkbox selection should not be allowed
                        cy.get('#checkbox').check({ force: true }); // Force the checkbox to be checked even if it's disabled
                        cy.get('#checkbox').should('not.be.checked');
                    }
                });
        
    
        
        
    }
    ClickReserveAppointment(){
    cy.xpath(this.ReserveAppointment).click();
    }

    /*
       **Assertion is used to verify the the title of the ReserveAppointment page
    */
       VerifyReserveAppoinmentPage() {
        cy.xpath(this.ReserveAppoinmentPageTitle).should('have.text', 'Reserve Appoinment');
    }

    EnterNameforAppoinment(Name : string){
        cy.xpath(this.PatientName).type(Name);
    }
    EnterPhoneNumforAppoinment(TelephoneNumber : string){
        cy.xpath(this.PatientTelephoneNumber).type(TelephoneNumber);
    }

    EnterPatientReason(Reason : string){
        cy.xpath(this.PatientReason).type(Reason);
    }

    PressBookBtn(){
        cy.xpath(this.BookButton).click();
        
    }

    DisplayAppoinmentSuccessMessage() {
        cy.xpath(this.AppoinmentSuccessMessage)
            .should('be.visible')
            .and('contain', 'Your Appointment successful. Thank you for choosing our services');
    }
}

    



