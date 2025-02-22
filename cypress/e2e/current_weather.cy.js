describe('Get Geo', ()=>{
    const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct';
    const apiKey = 'ac272c9810642e740730f17301289303';
    const lon = -7.2459717;
    const lat = 112.7378266;
    const inv_apiKey = '10ef7c20a49b35570b02334bac2559109';
    const inv_lon = 879999;
    const inv_lat = 7378266;

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
})