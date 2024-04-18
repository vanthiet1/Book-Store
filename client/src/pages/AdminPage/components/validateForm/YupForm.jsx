import * as Yup from 'yup';

const validationProductForm = Yup.object().shape({
    name: Yup.string().required('Tên sách là bắt buộc'),
    label: Yup.string().required('Nhãn là bắt buộc'),
    author: Yup.string().required('Tác giả là bắt buộc'),
    publishingCompany: Yup.string().required('Nhà xuất bản là bắt buộc'),
    genres: Yup.string().required('Thể loại là bắt buộc'),
});

export {validationProductForm};
