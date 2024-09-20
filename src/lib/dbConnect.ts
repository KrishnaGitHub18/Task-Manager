import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected){
        console.log("Already Connected to Database!");
        return;
    }

    try {
        const clusterconnect = await mongoose.connect('mongodb+srv://krishnadeheriya:krishna123@cluster0.9dngz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        connection.isConnected = clusterconnect.connections[0].readyState ;
        console.log("Connected Successfully");
    } catch (error) {
        console.log("Database Connection Failed", error);
        // process.exit(1);
    }
}

export default dbConnect;