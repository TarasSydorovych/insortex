// import axios from "axios"; // Додаємо імпорт для axios

// export default function CategoryList({
//   categories,
//   onSelectCategory,
//   fetchCategories,
// }) {
//   const handleDelete = async (id) => {
//     if (confirm("Ви впевнені, що хочете видалити цю категорію?")) {
//       await axios.delete(`/api/category?id=${id}`);
//       fetchCategories();
//     }
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Назва (UA)</th>
//           <th>Назва (EN)</th>
//           <th>Дії</th>
//         </tr>
//       </thead>
//       <tbody>
//         {categories.map((category) => (
//           <tr key={category._id}>
//             <td>{category.name.ua}</td>
//             <td>{category.name.en}</td>
//             <td>
//               <button onClick={() => onSelectCategory(category)}>
//                 Редагувати
//               </button>
//               <button onClick={() => handleDelete(category._id)}>
//                 Видалити
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
import axios from "axios";
import css from "../admin.module.css";

export default function CategoryList({
  categories,
  onEditCategory,
  fetchCategories,
}) {
  const handleDelete = async (id) => {
    if (confirm("Ви впевнені, що хочете видалити цю категорію?")) {
      await axios.delete(`/api/category?id=${id}`);
      fetchCategories();
    }
  };

  return (
    <table className={css.wrapTableAll}>
      <thead>
        <tr className={css.tableHeader}>
          <th className={css.tableHeaderCell}>Назва (UA)</th>
          <th className={css.tableHeaderCell}>Назва (EN)</th>
          <th className={css.tableHeaderCell}>Дії</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category._id} className={css.tableRow}>
            <td className={css.tableCell}>{category.name.ua}</td>
            <td className={css.tableCell}>{category.name.en}</td>
            <td className={css.tableCell}>
              <button
                className={css.editButton}
                onClick={() => onEditCategory(category._id)}
              >
                Редагувати
              </button>
              <button
                className={css.deleteButton}
                onClick={() => handleDelete(category._id)}
              >
                Видалити
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
