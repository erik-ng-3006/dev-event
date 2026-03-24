import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

// Route params are a Promise in Next.js 15+
type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
	try {
		const { slug } = await params;

		// Validate slug is present and non-empty
		if (!slug || typeof slug !== 'string' || slug.trim() === '') {
			return NextResponse.json(
				{ message: 'Slug is required' },
				{ status: 400 },
			);
		}

		// Validate slug only contains URL-safe characters
		if (!/^[a-z0-9-]+$/.test(slug)) {
			return NextResponse.json(
				{ message: 'Invalid slug format' },
				{ status: 400 },
			);
		}

		//Sanitize slug

		const sanitizedSlug = slug.toLowerCase().trim();

		await connectDB();

		const event = await Event.findOne({
			slug: sanitizedSlug,
		}).lean();

		if (!event) {
			return NextResponse.json(
				{ message: `No event found with slug: ${sanitizedSlug}` },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ message: 'Event Fetched Successfully', event },
			{ status: 200 },
		);
	} catch (e) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Error fetching event by slug:', e);
		}

		if (e instanceof Error) {
			//Handle specific error cases
			if (e.message.includes('MONGODB_URI')) {
				return NextResponse.json(
					{
						message: 'Database configuration error',
						error: e.message,
					},
					{ status: 500 },
				);
			}
			return NextResponse.json(
				{
					message: 'Failed to fetch event',
					error: e.message,
				},
				{ status: 500 },
			);
		}
		//Handle unknown error
		return NextResponse.json(
			{
				message: 'Unexpected error occurred',
			},
			{ status: 500 },
		);
	}
}
