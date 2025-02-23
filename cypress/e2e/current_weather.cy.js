describe('Get Geo', ()=>{
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '9ef7c20a49b35570b02334bac2559104';
    const lon = 112.7378;
    const lat = -7.246;
    const inv_apiKey = '10ef7c20a49b35570b02334bac2559109';
    const inv_lon = 7378266;
    const inv_lat = 879999;

    it('Request current weather with valid coordinate', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                lat : lat,
                lon : lon,
                appid : apiKey
            }
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('coord');
            expect(response.body).to.have.property('weather');
            expect(response.body.coord.lon).to.eq(lon);
            expect(response.body.coord.lat).to.eq(lat);
            expect(response.body.name).to.eq('Surabaya');
        })
    })

    it('Request current weather with invalid lattitude', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                lat : inv_lat,
                lon : lon,
                appid : apiKey
            },
            failOnStatusCode: false
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(400);
            expect(response.body.cod).to.be.eq('400');
            expect(response.body.message).to.eq('wrong latitude');
        })
    })

    it('Request current weather with invalid longitude', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                lat : lat,
                lon : inv_lon,
                appid : apiKey
            },
            failOnStatusCode: false
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(400);
            expect(response.body.cod).to.be.eq('400');
            expect(response.body.message).to.eq('wrong longitude');
        })
    })

    it('Request current weather with invalid longitude', ()=>{
        cy.request({
            method : 'GET',
            url : `${apiUrl}`,
            qs : {
                lat : '',
                lon : '',
                appid : apiKey
            },
            failOnStatusCode: false
        }).as('list')
        
        cy.get('@list').should((response)=>{
            expect(response.status).to.eq(400);
            expect(response.body.cod).to.be.eq('400');
            expect(response.body.message).to.eq('Nothing to geocode');
        })
    })
})