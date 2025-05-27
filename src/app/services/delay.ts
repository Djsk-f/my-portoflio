export default function Delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 2000);
    });
}