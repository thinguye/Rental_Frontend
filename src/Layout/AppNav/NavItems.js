export const MainNav = [
    {
        icon: 'pe-7s-rocket',
        label: 'Trang chủ',
        to: '#/dashboards/basic',
    },
];
export const ComponentsNav = [
    {
        icon: 'pe-7s-home',
        label: 'Phòng',
        to: '#/manage/rooms',
    },
    {
        icon: 'pe-7s-user',
        label: 'Khách trọ',
        to: '#/manage/guests',

    },
    {
        icon: 'pe-7s-date',
        label: 'Thông tin đặt phòng',
        to: '#/manage/bookings',
    },
    {
        icon: 'pe-7s-tools',
        label: 'Lịch sử sửa chữa',
        to: '#/manage/repairs',
    },
    {
        icon: 'pe-7s-calculator',
        label: 'Quản lý hóa đơn',
        to: '#/manage/bills',
    },
];
export const FormsNav = [
    {
        icon: 'pe-7s-user',
        label: 'Tài khoản',
        content: [
            {
                label: 'Đổi mật khẩu',
                to: '#/account',
            },
            {
                label: 'Đăng xuất',
                to: '#/homepage',
            },
        ],
    }
];