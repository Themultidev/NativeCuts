import 'dotenv/config';
import { connectDb } from './db.js';
import User from './models/User.js';

if (!process.env.ADMIN_EMAIL) throw new Error('Set ADMIN_EMAIL to the existing account that should become admin.');
await connectDb();
const user = await User.findOneAndUpdate({ email: process.env.ADMIN_EMAIL.trim().toLowerCase() }, { role: 'admin' }, { new: true });
if (!user) throw new Error('No user exists with ADMIN_EMAIL. Register that account first.');
console.log(`Admin role granted to ${user.email}`);
process.exit(0);
