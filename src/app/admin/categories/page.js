// "use client";
// import CategoryForm from "@/app/components/admin/category/categoryForm";
// import CategoryList from "@/app/components/admin/category/categoryList";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import css from "../../components/admin/admin.module.css";
// import BackMenu from "@/app/components/admin/backMenu";
// export default function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("/api/category");
//       setCategories(res.data);
//     } catch (error) {
//       console.error("Error fetching categories", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleSelectCategory = (category) => {
//     setSelectedCategory(category);
//   };
//   console.log("selectedCategory", selectedCategory);

//   return (
//     <div className={css.wrapAllAdmin}>
//       <BackMenu />
//       <div className={css.wrapCategoryAdm}>
//         <h1>Керування категоріями</h1>
//         <CategoryForm
//           selectedCategory={selectedCategory}
//           fetchCategories={fetchCategories}
//           clearSelection={() => setSelectedCategory(null)}
//           categories={categories}
//         />
//         <CategoryList
//           categories={categories}
//           onSelectCategory={handleSelectCategory}
//           fetchCategories={fetchCategories}
//         />
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CategoryList from "../../components/admin/category/categoryList";
import css from "../../components/admin/admin.module.css";
import BackMenu from "../../components/admin/backMenu";
import "../../components/font/FuturaPT/stylesheet.css";
import "../../components/font/monrope/stylesheet.css";
export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    router.push("/admin/categories/add");
  };

  const handleEditCategory = (categoryId) => {
    router.push(`/admin/categories/${categoryId}`);
  };

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <div className={css.wrapMainButton}>
          <h1 className={css.enterH1}>Керування категоріями</h1>
          <button className={css.enterButtonInNew} onClick={handleAddCategory}>
            Додати категорію
          </button>
        </div>
        <CategoryList
          categories={categories}
          onEditCategory={handleEditCategory}
          fetchCategories={fetchCategories}
        />{" "}
      </div>
    </div>
  );
}
