import Heading from '@tiptap/extension-heading';

export const CustomHeading = Heading.extend({
    // Разрешаем только базовые стили. 
    // Так как TextStyle здесь нет, font-size внутри <span> автоматически удалится
    marks: 'bold italic strike link code', 
});