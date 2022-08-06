import { connection } from '../configs/db'
import { createLikesTable } from '../models/likeModel'
import { createReplyTable } from '../models/replyModel'
import { createMajorsTable } from '../models/majorModel'
import { createCountsTable } from '../models/countModel'
import { createAccountsTable } from '../models/accountModel'
import { createCommentsTable } from '../models/commentModel'
import { dropOnlineTable, createOnlineTable } from '../models/onlineModel'
import { createChatTable, createChatUserTable } from '../models/chatModel'

// create 'coym' database before you run
export const createTables = function () {
    // createMajorsTable(connection)
    // createAccountsTable(connection)
    // createCountsTable(connection)
    // createCommentsTable(connection)
    // createLikesTable(connection)
    // dropOnlineTable(connection)
    // createOnlineTable(connection)
    // createReplyTable(connection)
    // createChatUserTable(connection)
    // createChatTable(connection)
}