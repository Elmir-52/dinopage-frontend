export default function getCookie(name: string) {
    // Получаем все cookies в виде строки
    const cookieString: string = document.cookie;
    
    // Разбиваем строку на отдельные cookies
    const cookies: string[] = cookieString.split('; ');
    
    // Ищем нужную cookie, которая начинается с указанного имени
    const targetCookie = cookies.find(cookie => 
        cookie.startsWith(name + '=')
    );
    
    // Если cookie найдена, извлекаем её значение
    if (targetCookie) {
        // Разделяем строку по знаку '=' и берём значение
        return targetCookie.split('=')[1];
    }
    
    // Если cookie не найдена, возвращаем undefined
    return undefined;
}