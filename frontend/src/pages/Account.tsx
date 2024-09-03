
function Account () {

    fetch('http://localhost:3000/api/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error:', error))

    return (
        <div>
            <h1>Account</h1>
        </div>
    )
}

export default Account;