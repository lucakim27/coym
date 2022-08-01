import { connection } from '../configs/db'
import { createLikesTable } from '../models/like'
import { createReplyTable } from '../models/reply'
import { createMajorsTable } from '../models/major'
import { createCountsTable } from '../models/count'
import { createAccountsTable } from '../models/account'
import { createCommentsTable } from '../models/comment'
import { dropOnlineTable, createOnlineTable } from '../models/online'
import { createChatTable, createChatUserTable } from '../models/chat'

// create 'coym' database before you run
export const createTables = function () {
    createMajorsTable(connection)
    createAccountsTable(connection)
    createCountsTable(connection)
    createCommentsTable(connection)
    createLikesTable(connection)
    dropOnlineTable(connection)
    createOnlineTable(connection)
    createReplyTable(connection)
    createChatUserTable(connection)
    createChatTable(connection)
}