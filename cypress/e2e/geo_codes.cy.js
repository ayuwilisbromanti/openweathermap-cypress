describe('Get Geo', ()=>{
    const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct';
    const apiKey = 'ac272c9810642e740730f17301289303';
    const city = 'Surabaya';
    const inv_city = 'Uncountry';
    const inv_apiKey = '10ef7c20a49b35570b02334bac2559109';

    it('Verify valid response with valid paramaters', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                q : city,
                limit : 1,
                appid : apiKey
            }
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);
            expect(response.body[0]).to.have.property('lat');
            expect(response.body[0]).to.have.property('lon');
            expect(response.body[0].name).to.eq(city);
        })
    })

    it('When input unexisted country ', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                q : inv_city,
                limit : 1,
                appid : apiKey
            }
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.not.greaterThan(0);
        })
    })

    it('When input invalid Api Key ', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                q : city,
                limit : 1,
                appid : inv_apiKey
            },
            failOnStatusCode: false
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(401);
            expect(response.body.cod).to.be.eq(401);
            expect(response.body.message).to.be.eq('Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.');
        })
    })

    it('When pramater query is missing ', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                appid : apiKey
            },
            failOnStatusCode: false
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(400);
            expect(response.body.cod).to.be.eq('400');
            expect(response.body.message).to.be.eq('Nothing to geocode');
        })
    })

    it('When set limit more than 1', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                q : city,
                limit : 5,
                appid : apiKey
            }
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.eq(5);
            expect(response.body[0]).to.have.property('lat');
            expect(response.body[0]).to.have.property('lon');
            expect(response.body[0].name).to.eq(city);
        })
    })
})