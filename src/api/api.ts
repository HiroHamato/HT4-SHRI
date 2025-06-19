export const API_BASE_URL = 'http://127.0.0.1:3000';

export const generateReport = async (
    size: number = 0.01,
    withErrors: string = 'on',
    maxSpend: string = '1000'
): Promise<Blob> => {
    const query = new URLSearchParams({
        size: size.toString(),
        withErrors,
        maxSpend,
    }).toString();

    const response = await fetch(`${API_BASE_URL}/report?${query}`);
    if (!response.ok) throw new Error('Report generation failed');
    return await response.blob();
};

export const aggregateData = async (
    rows: number,
    file: File
): Promise<ReadableStream<Uint8Array> | null> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/aggregate?rows=${rows}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok || !response.body) throw new Error('Aggregation failed');
    return response.body;
};
