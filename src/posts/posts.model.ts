import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface PostCreationAttrs {
  title: string
  contnet: string
  userId: number
  image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model <Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: 'some title', description: 'News' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string

  @ApiProperty({ example: 'some text', description: 'hot news' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string

  @Column({ type: DataType.STRING, allowNull: false })
  image: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @BelongsTo(() => User)
  author: User
}