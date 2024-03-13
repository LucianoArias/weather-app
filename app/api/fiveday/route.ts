import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
    const lat = -34.61315;
    const lon = -58.37723;
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es`;
    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log('Error in getting daily data');
    return new Response('Error in getting daily data', { status: 500 });
  }
}