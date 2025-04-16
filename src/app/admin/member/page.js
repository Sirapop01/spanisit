"use client";

import { useState } from "react";
import Footer from "../../../components/footer";
import Nav from "../../../components/nav_admin";

export default function Member() {
  const currentYear = new Date().getFullYear();
  const startYear = 2540; // หรือปีเริ่มต้นที่เหมาะสม
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

  const positions = [
    "ประธานสภาผู้แทนนิสิต",
    "รองประธานสภาผู้แทนนิสิต",
    "เหรัญญิกสภาผู้แทนนิสิต",
    "เลขาธิการสภาผู้แทนนิสิต",
    "เลขานุการสภาผู้แทนนิสิต",
    "ประธานคณะกรรมาธิการองค์กรกิจกรรมนิสิต",
    "คณะกรรมาธิการองค์กรกิจกรรมนิสิต",
    "ประธานคณะกรรมาธิการควบคุม ติดตาม และ ตรวจสอบ",
    "คณะกรรมาธิการควบคุม ติดตาม และ ตรวจสอบ",
    "ประธานคณะกรรมาธิการกิจการภายในและทรัพย์สิน",
    "คณะกรรมาธิการกิจการภายในและทรัพย์สิน",
    "ประธานคณะกรรมาธิการธรรมนูญนิสิต",
    "คณะกรรมาธิการธรรมนูญนิสิต",
    "ประธานคณะกรรมาธิการส่งเสริมภาพลักษณ์และสื่อสารองค์กร",
    "คณะกรรมาธิการส่งเสริมภาพลักษณ์และสื่อสารองค์กร",
    "ประธานคณะกรรมาธิการนโยบายและแผน",
    "คณะกรรมาธิการนโยบายและแผน"
  ];

  const prefixes = ["นาย", "นางสาว"];

  const faculties = [
    "คณะวิทยาการจัดการ",
    "คณะพาณิชยนาวีนานาชาติ",
    "คณะวิศกรรมศาสตร์ ศรีราชา",
    "คณะวิทยาศาสตร์ ศรีราชา",
    "คณะเศรษฐศาสตร์ ศรีราชา",
  ];

  const [imageName, setImageName] = useState("");
  const [formData, setFormData] = useState({
    year: "",
    position: "",
    prefix: "",
    faculty: "",
    name: "",
    surname: "",
    nickname: "",
    motto: "",
  });
  const [errors, setErrors] = useState({});

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) setImageName(file.name);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.year) newErrors.year = "กรุณาเลือกปี";
    if (!formData.position) newErrors.position = "กรุณาเลือกตำแหน่ง";
    if (!formData.prefix) newErrors.prefix = "กรุณาเลือกคำนำหน้า";
    if (!formData.faculty) newErrors.faculty = "กรุณาเลือกคณะ";
    if (!formData.name) newErrors.name = "กรุณากรอกชื่อ";
    if (!formData.surname) newErrors.surname = "กรุณากรอกนามสกุล";
    if (!formData.nickname) newErrors.nickname = "กรุณากรอกชื่อเล่น";
    if (!formData.motto) newErrors.motto = "กรุณากรอกคติ";
    if (!imageName) newErrors.imageName = "กรุณาอัพโหลดรูปภาพ";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // ถ้าไม่มีข้อผิดพลาด
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      // ถ้าข้อมูลถูกต้องแล้ว
      console.log("Form submitted successfully", formData);
      // ทำการ submit ฟอร์มหรือกระทำอื่นๆ ตามต้องการ
    } else {
      console.log("Form has errors", errors);
    }
  }

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-primary">เพิ่มทำเนียบสภา</h1>
        <div className="max-w-4xl mx-auto mt-5 p-8 border rounded-2xl shadow-sm">
          <form className="grid grid-cols-2 gap-x-10 gap-y-6 text-black" onSubmit={handleSubmit}>
            {/* ทำเนียบ */}
            <div>
              <label className="block mb-1 font-medium">ทำเนียบประจำปี</label>
              <select
                className={`w-full px-4 py-2 rounded-full border ${errors.year ? 'border-red-500' : ''}`}
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <option disabled value="">เลือกปี</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>

            {/* ตำแหน่ง */}
            <div>
              <label className="block mb-1 font-medium">ตำแหน่ง</label>
              <select
                className={`w-full px-4 py-2 rounded-full border ${errors.position ? 'border-red-500' : ''}`}
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option disabled value="">ตำแหน่ง</option>
                {positions.map((pos, idx) => (
                  <option key={idx} value={pos}>{pos}</option>
                ))}
              </select>
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>

            {/* คำนำหน้า */}
            <div>
              <label className="block mb-1 font-medium">คำนำหน้า</label>
              <select
                className={`w-full px-4 py-2 rounded-full border ${errors.prefix ? 'border-red-500' : ''}`}
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
              >
                <option disabled value="">คำนำหน้า</option>
                {prefixes.map((prefix, idx) => (
                  <option key={idx} value={prefix}>{prefix}</option>
                ))}
              </select>
              {errors.prefix && <p className="text-red-500 text-sm">{errors.prefix}</p>}
            </div>

            {/* รูปภาพ */}
            <div>
              <label className="block mb-1 font-medium">รูปภาพ</label>
              <label className="w-full flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer">
                <span>{imageName || "อัพโหลดรูปภาพ"}</span>
                <span className="ml-auto text-xl font-bold text-blue-600">+</span>
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
              {errors.imageName && <p className="text-red-500 text-sm">{errors.imageName}</p>}
            </div>

            {/* ชื่อ */}
            <div>
              <label className="block mb-1 font-medium">ชื่อ</label>
              <input
                type="text"
                placeholder="ชื่อจริง"
                className={`w-full px-4 py-2 rounded-full border ${errors.name ? 'border-red-500' : ''}`}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* นามสกุล */}
            <div>
              <label className="block mb-1 font-medium">นามสกุล</label>
              <input
                type="text"
                placeholder="นามสกุล"
                className={`w-full px-4 py-2 rounded-full border ${errors.surname ? 'border-red-500' : ''}`}
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
            </div>

            {/* ชื่อเล่น */}
            <div>
              <label className="block mb-1 font-medium">ชื่อเล่น</label>
              <input
                type="text"
                placeholder="ชื่อเล่น"
                className={`w-full px-4 py-2 rounded-full border ${errors.nickname ? 'border-red-500' : ''}`}
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
              />
              {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}
            </div>

            {/* คณะ */}
            <div>
              <label className="block mb-1 font-medium">คณะ</label>
              <select
                className={`w-full px-4 py-2 rounded-full border ${errors.faculty ? 'border-red-500' : ''}`}
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
              >
                <option disabled value="">เลือกคณะ</option>
                {faculties.map((faculty, idx) => (
                  <option key={idx} value={faculty}>{faculty}</option>
                ))}
              </select>
              {errors.faculty && <p className="text-red-500 text-sm">{errors.faculty}</p>}
            </div>

            {/* คติ */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium">คติ</label>
              <input
                type="text"
                placeholder="จงทำวันนี้ให้ดีที่สุด"
                className={`w-full px-4 py-2 rounded-full border ${errors.motto ? 'border-red-500' : ''}`}
                name="motto"
                value={formData.motto}
                onChange={handleChange}
              />
              {errors.motto && <p className="text-red-500 text-sm">{errors.motto}</p>}
            </div>

            <button
              type="submit"
              className="col-span-2 bg-primary text-white py-2 rounded-full hover:bg-secondary transition duration-300"
            >
              บันทึก
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
