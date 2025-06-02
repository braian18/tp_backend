import app from './app.js';
//instanciamos la variable app que hace uso de express

const main = () => {

    const port = app.get('port')
    app.listen(port)
    console.log(`Server running on port: ${port}`)

};

main()
