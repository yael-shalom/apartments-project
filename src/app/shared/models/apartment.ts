export interface Apartment {
  _id: number; // מזהה ייחודי של האובייקט
  Lamas_name: string; // שם העיר או האזור
  Lamas_code: number; // קוד ה-Lamas של העיר
  year: number; // השנה המדוברת
  '3 rooms apartments': number; // מספר דירות של 3 חדרים
  'average price (NIS) 3 rooms apartments': number; // מחיר ממוצע (בשקלים) לדירות של 3 חדרים
  '4+ rooms apartments': number; // מספר דירות עם 4 חדרים ומעלה
  'average price (NIS) 4+ rooms apartments': number; // מחיר ממוצע (בשקלים) לדירות עם 4 חדרים ומעלה
}