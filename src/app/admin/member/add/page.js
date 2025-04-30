"use client";

import { useState } from "react";
import Footer from "../../../../components/footer";
import LoadingSpinner from "@/components/loading";
import { useRouter } from 'next/navigation'

import positionData from "@/data/positionData";
import facultyData from "@/data/facultyData";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Icon } from "@iconify/react";

import { addMember } from "@/services/memberServices";

export default function Member() {
  const router = useRouter();

  const currentYear = new Date().getFullYear() + 543;
  const startYear = 2567; // หรือปีเริ่มต้นที่เหมาะสม
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

  const prefixes = ["นาย", "นางสาว"];

  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    year: '',
    prefix: '',
    name: '',
    surname: '',
    nickname: '',
    faculty: '',
    position: '',
    motto: '',
    photoURL: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'year' ? Number(value) : value,
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
    if (!imageName) newErrors.imageName = "กรุณาอัพโหลดรูปภาพ";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // ถ้าไม่มีข้อผิดพลาด
  }

  function resetForm() {
    setFormData({
      year: '',
      prefix: '',
      name: '',
      surname: '',
      nickname: '',
      faculty: '',
      position: '',
      motto: '',
      photoURL: ''
    });
    setImageFile(null);
    setImageName('');
    setErrors({});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const imageToUpload = new FormData();

    if (validate()) {
      // ถ้าข้อมูลถูกต้องแล้ว
      setIsLoading(true); // เปลี่ยนสถานะเป็นกำลังโหลด

      const fileNameWithoutExtension = imageName.split('.').slice(0, -1).join('.');

      //เตรียมข้อมูลขึ้น cloudinary
      imageToUpload.append('type', 'member');
      imageToUpload.append('year', formData.year);
      imageToUpload.append('file', imageFile);
      imageToUpload.append('imageName', fileNameWithoutExtension);

      try {
        const response = await axios.post('/admin/api/upload', imageToUpload, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
        })

        console.log('Upload successful:', response.data);

        const uploadedImageUrl = response.data.results[0].url;

        console.log(uploadedImageUrl)

        const updatedFormData = { 
          ...formData, 
          motto: formData.motto.trim() === '' ? "-" : formData.motto,
          photoURL: uploadedImageUrl 
        };
        setFormData(updatedFormData);
        console.log(updatedFormData)

        const result = await addMember(updatedFormData);
        
        if(result.success){
          console.log('Member added successfully with ID:', result.id);
          toast.success("บันทึกข้อมูลสมาชิกสำเร็จ")
          resetForm();
        } else {
          toast.error("เกิดข้อผิดพลาด")
          console.log('Error adding member:', result.error);
        }

      } catch (error) {
        toast.error("เกิดข้อผิดพลาด")
        console.error('Error uploading image:', error);

      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Form has errors", errors);
    }
  }

  return (
    <div>
      {isLoading && (
        <LoadingSpinner/>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-4xl mx-auto mb-4">
          <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full flex items-center cursor-pointer ">
            <Icon icon="mdi:arrow-left" className="text-4xl text-primary " />
          </button>
          <h1 className="text-3xl font-bold text-center text-primary">เพิ่มทำเนียบสภา</h1>
        </div>
        <div className="max-w-4xl mx-auto mt-5 p-8 border rounded-2xl shadow-sm">
          <form className="grid grid-cols-2 gap-x-10 gap-y-6 text-black" onSubmit={handleSubmit}>
            {/* ทำเนียบ */}
            <div>
              <div className="block flex items-center gap-1">
                <label className="mb-1 font-medium ">ทำเนียบประจำปี</label>
                <span className="text-red-500 text-xl">*</span>
              </div>

              <select
                className={`w-full px-4 py-2 rounded-full border ${errors.year ? 'border-red-500' : ''} cursor-pointer`}
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <option disabled value="">-- เลือกปีวาระ --</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>

            {/* ตำแหน่ง */}
            <div>
              <div className="block flex items-center gap-1">
                <label className="block mb-1 font-medium">ตำแหน่ง</label>
                <span className="text-red-500 text-xl">*</span>
              </div>

              <select
                className={`w-full px-4 py-2 rounded-full border ${errors.position ? 'border-red-500' : ''} cursor-pointer`}
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option disabled value="">-- เลือกตำแหน่ง --</option>
                {positionData.map((pos, idx) => (
                  <option key={idx} value={pos.name}>{pos.name}</option>
                ))}
              </select>
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>

            {/* คำนำหน้า */}
            <div>
              <div className="block flex items-center gap-1">
                <label className="block mb-1 font-medium">คำนำหน้า</label>
                <span className="text-red-500 text-xl">*</span>
              </div>
              
              <select
                className={`w-full px-4 py-2 rounded-full border ${errors.prefix ? 'border-red-500' : ''} cursor-pointer`}
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
              >
                <option disabled value="">-- เลือกคำนำหน้า --</option>
                {prefixes.map((prefix, idx) => (
                  <option key={idx} value={prefix}>{prefix}</option>
                ))}
              </select>
              {errors.prefix && <p className="text-red-500 text-sm">{errors.prefix}</p>}
            </div>

            {/* รูปภาพ */}
            <div>
              <div className="block flex items-center gap-1">
                <label className="block mb-1 font-medium">รูปภาพ</label>
                <span className="text-red-500 text-xl">*</span>
              </div>
              
              <label className="w-full flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer">
                <span>{imageName || "อัปโหลดรูปภาพ"}</span>
                <span className="ml-auto text-xl font-bold text-blue-600">+</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
              {errors.imageName && <p className="text-red-500 text-sm">{errors.imageName}</p>}
            </div>

            {/* ชื่อ */}
            <div>
              <div className="block flex items-center gap-1">
                <label className="block mb-1 font-medium">ชื่อ</label>
                <span className="text-red-500 text-xl">*</span>
              </div>
              
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
              <div className="block flex items-center gap-1">
                <label className="block mb-1 font-medium">นามสกุล</label>
                <span className="text-red-500 text-xl">*</span>
              </div>
              
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
              <div className="block flex items-center gap-1">
                <label className="block mb-1 font-medium">ชื่อเล่น</label>
                <span className="text-red-500 text-xl">*</span>
              </div>
          
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
              <div className="block flex items-center gap-1">
                <label className="block mb-1 font-medium">คณะ</label>
                <span className="text-red-500 text-xl">*</span>
              </div>
              
              <select
                className={`w-full px-4 py-2 rounded-full border ${errors.faculty ? 'border-red-500' : ''} cursor-pointer`}
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
              >
                <option disabled value="">-- เลือกคณะ --</option>
                {facultyData.map((faculty) => (
                  <option key={faculty.id} value={faculty.name}>{faculty.name}</option>
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
            </div>

            <button
              type="submit"
              className="col-span-2 bg-primary text-white py-2 rounded-full hover:bg-secondary transition duration-300 cursor-pointer"
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
