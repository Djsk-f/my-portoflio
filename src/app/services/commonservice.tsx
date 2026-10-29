// CV disponibles en français et en anglais ; le français sert de repli
export const getCvUrl = (locale: string) =>
    `/assets/files/cv-fidele-loffou-${locale === 'en' ? 'en' : 'fr'}.pdf`;

export const getCvFileName = (locale: string) =>
    locale === 'en' ? 'Fidele_Loffou_CV_EN.pdf' : 'Fidele_Loffou_CV_FR.pdf';

export const uploadMyCv = (event: React.MouseEvent<HTMLButtonElement>, locale: string) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = getCvUrl(locale);
    link.download = getCvFileName(locale);
    link.click();
}
