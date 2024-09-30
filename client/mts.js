const apiKey =  process.env.REACT_APP_API_KEY; // Replace with your actual API key
const address = '8 W Scheme Number 2, Farid Town, Sahiwal, Sahiwal District, Punjab 57000, Pakistan'; // The address you want to geocode
// const address = `30°40'20.7"N 73°07'06.3"E`
// const address = `30°40'37.6"N 73°04'36.8"E`

""; // The address you want to geocode

const forwardGeocode = async (address) => {
    const url = `https://geocode.xyz/${encodeURIComponent(address)}?json=1&auth=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        
        // Extract coordinates from the response
        if (data.latt && data.longt) {
            const coordinates = {
                latitude: data.latt,
                longitude: data.longt
            };
            console.log(`Coordinates: ${coordinates.latitude}, ${coordinates.longitude}`);
        } else {
            console.log('Geocoding failed or no coordinates found.');
        }
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
    }
};

// Call the function
forwardGeocode(address);
