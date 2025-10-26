import { NextRequest, NextResponse } from 'next/server';
import { getPage, getGlobalConfig } from '@/lib/api';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const slug = searchParams.get('slug');

  try {
    // Get the homepage data (slug = '/')
    const [page, config] = await Promise.all([
      getPage({
        preview: false,
        slug: slug || '/',
      }),
      getGlobalConfig({ preview: false }),
    ]);

    if (!page) {
      return NextResponse.json(
        { error: 'page not found' },
        { status: 404 }
      );
    }

    // Return the raw data structure
    return NextResponse.json({
      page,
      config,
      meta: {
        timestamp: new Date().toISOString(),
        url: request.url,
        sections: page.fields.sections?.length || 0,
        sectionTypes: page.fields.sections?.map(section => section.sys.contentType.sys.id) || []
      }
    });
  } catch (error) {
    console.error('Error fetching page data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page data' },
      { status: 500 }
    );
  }
}