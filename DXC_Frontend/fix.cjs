const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'features');

function replaceInDir(dir, replacements) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath, replacements);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const { from, to } of replacements) {
                const regex = new RegExp(from, 'g');
                if (regex.test(content)) {
                    content = content.replace(regex, to);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

// 1. Fix Tours
replaceInDir(path.join(srcDir, 'tours'), [
    { from: 'zaloMiniAppHotelsAdmin', to: 'zaloMiniAppToursAdmin' },
    { from: 'ZaloMiniAppHotelsAdmin', to: 'ZaloMiniAppToursAdmin' },
    { from: 'HotelWithImagesDto', to: 'TourDto' },
    { from: 'getApiZaloMiniAppAdminTours', to: 'getApiZaloMiniAppAdminTours' }, // check casing
    { from: 'Hotel', to: 'Tour' },
    { from: 'hotel', to: 'tour' }
]);

// 2. Fix Tickets
replaceInDir(path.join(srcDir, 'tickets'), [
    { from: 'getApiUsersTickets', to: 'zaloMiniAppTicketsAdminGetTickets' },
    { from: 'postApiUsersTicketsCreate', to: 'zaloMiniAppTicketsAdminCreateTicket' },
    { from: 'postApiUsersTicketsUpdate', to: 'zaloMiniAppTicketsAdminUpdateTicket' },
    { from: 'postApiUsersTicketsDelete', to: 'zaloMiniAppTicketsAdminDeleteTicket' },
    { from: 'getApiUsersTicketsId', to: 'zaloMiniAppTicketsAdminGetTicketById' },
    { from: 'GetApiUsersTicketsParams', to: 'ZaloMiniAppTicketsAdminGetTicketsParams' },
    { from: 'RoleDto', to: 'TicketDto' },
    { from: 'useUsersRoles', to: 'useZaloMiniAppTicketsAdmin' },
    { from: 'useRole', to: 'useTicket' },
    { from: 'CreateTicketCommand', to: 'CreateTicketCommand' }, // adjust as needed
    { from: 'useRoles', to: 'useTickets' },
    { from: 'useZaloMiniAppTicketsAdminAdmin', to: 'useZaloMiniAppTicketsAdmin' }
]);

// 3. Fix Orders
replaceInDir(path.join(srcDir, 'orders'), [
    { from: 'getApiUsersOrders', to: 'zaloMiniAppOrdersAdminGetOrders' },
    { from: 'postApiUsersOrdersCreate', to: 'zaloMiniAppOrdersMobileCreateOrder' },
    { from: 'postApiUsersOrdersUpdate', to: 'zaloMiniAppOrdersAdminUpdateOrder' },
    { from: 'postApiUsersOrdersDelete', to: 'zaloMiniAppOrdersAdminDeleteOrder' },
    { from: 'getApiUsersOrdersId', to: 'zaloMiniAppOrdersAdminGetOrderById' },
    { from: 'GetApiUsersOrdersParams', to: 'ZaloMiniAppOrdersAdminGetOrdersParams' },
    { from: 'RoleDto', to: 'BookingOrderDto' }
]);

// 4. Fix Transactions
replaceInDir(path.join(srcDir, 'transactions'), [
    { from: 'getApiUsersTransactions', to: 'zaloMiniAppTransactionsAdminGetTransactions' },
    { from: 'postApiUsersTransactionsCreate', to: 'zaloMiniAppTransactionsMobileCreateTransaction' },
    { from: 'postApiUsersTransactionsUpdate', to: 'zaloMiniAppTransactionsMobileUpdateTransactionWebhook' },
    { from: 'getApiUsersTransactionsId', to: 'zaloMiniAppTransactionsAdminGetTransactionById' },
    { from: 'GetApiUsersTransactionsParams', to: 'ZaloMiniAppTransactionsAdminGetTransactionsParams' },
    { from: 'RoleDto', to: 'PaymentTransactionDto' },
    { from: 'useUsersRoles', to: 'useZaloMiniAppTransactionsAdmin' }
]);

console.log("Fixes applied!");
