export const uploadMyCv = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = '/assets/files/fideleCV.pdf';
    link.download = 'MonCV_Fidele_Loffou.pdf';
    link.click();
}