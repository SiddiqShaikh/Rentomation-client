export type ResponseError = {

}
// const listingSchema = new Schema({
//     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     address: {
//       street: { type: String },
//       city: { type: String },
//       state: { type: String },
//       zipCode: { type: String },
//       country: { type: String }
//     },
//     pricePerNight: { type: Number, required: true },
//     propertyType: { type: String, enum: ['Apartment', 'House', 'Room'], required: true },
//     totalRooms: { type: Number, required: true },
//     rooms: [{
//       roomId: { type: Schema.Types.ObjectId, required: true },
//       roomName: { type: String, required: true },
//       pricePerNight: { type: Number, required: true },
//       amenities: [String],
//       images: [String]
//     }],
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
//   });
export interface IPropertyData {
    coverImage: string;
    title: string;
    rent: number;
    bed: number;
    shower: number;
    area: number;
    status: "verified" | "unverified";
}
export type TPropertyListing = {
    _id: string; // MongoDB ObjectId as a string
    owner: string; // Reference to a User, stored as a string
    title: string;
    description: string;
    rent: number;
    // propertyType: 'Apartment' | 'House' | 'Room'; // Enum values
    bed: number;
    status: "verified" | "unverified";
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    shower: number;
    parking:boolean;
    images: [string];

    // rooms: Room[];
    // address?: Address; // Optional if not always provided
}