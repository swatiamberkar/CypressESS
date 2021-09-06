
/*describe('Transfer', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
	var employeeID ='CY39'
	var managerID = 'CY5'
	var transferSetting = 'ESS Transfer'
	var newLineManager = 'CY1'
	var HrID = 'CY37'

	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		Cypress.Cookies.preserveOnce('__Secure-3PSIDCC', '__Host-GAPS', '__Host-3PLSID', 'SIDCC','__Secure-3PAPISID', 'SSID', 'ACCOUNT_CHOOSER', 'SAPISID', 'APISID', '__Secure-3PSID', 'SID', 'LSID', 'HSID', 'NID', '1P_JAR', 'SEARCH_SAMESITE', 'OGPC')
	
   })
   
	
		
	it('Verify Transfer Letter in Employee Login', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit('https://google.com')
		cy.wait(2000)
	
		cy.get('[title="Search"]').click({force: true})		
		cy.get('[title="Search"]').clear().type('gmail sign up').type('{enter}')
		cy.wait(2000)
		cy.contains('span', 'Create your Google Account - Google Accounts').click({force: true})

	
   })
   
   it('Verify Transfer Letter in Employee Login', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		cy.get('[name="lastName"]').click({force: true})		
		cy.get('[name="lastName"]').clear().type('gmail sign up')
	
   })
	
})
*/	

describe('Login', () => {
  it('Login through Google', () => {
    const username = Cypress.env('googleSocialLoginUsername')
    const password = Cypress.env('googleSocialLoginPassword')
    const loginUrl = Cypress.env('loginUrl')
    const cookieName = Cypress.env('cookieName')
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      usernameField: '#input_username',
      passwordFiedl: '#input_password',
      passwordSubmitBtn: '#login_btn_sign',
      headless: true,
      logs: false,
      loginSelector: '[href="/auth/auth0/google-oauth2"]',
      postLoginSelector: '.account-panel'
    }

    return cy.task('GoogleSocialLogin', socialLoginOptions).then(({cookies}) => {
      cy.clearCookies()

      const cookie = cookies.filter(cookie => cookie.name === cookieName).pop()
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure
        })

        Cypress.Cookies.defaults({
          preserve: cookieName
        })
      }
    })
  })
})