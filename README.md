# Sudoku
The purpose of this repo is to demonstrate how I solve Sudoku puzzles.

I'm sure there are better examples of how to programatically solve any given puzzle, but that's not the point of this application.

Given the popularity of Sudoku, I'm also sure that there's better descriptions of the algorithms that I use to solve puzzles, but I haven't checked.

The reason I haven't checked is that I want to try and discover for myself the best algorithms to use. A lot of the work I do is based on finding the best library/ tool/ application to do the job that needs to be done.

As a developer, I see myself as more of a construction worker than a materials scientist.

I'm more interested in getting the house built with existing blocks than I am in developing newer blocks to make my house more energy efficient etc. I get paid to build houses, not to build blocks.

In my day to day job, there's not a lot of discovery. Sure, every house I build is different, and sometimes I'm building apartments, or mansions or dog houses, but I build them using well understood patterns and designs. I add a few cornices and decorations to meet the requirements, but there's no true discovery. This is one of my attempts at true discovery. Can I build a solver that mimics how I solve Sudoku?

# Sudoku Grid Sizes
The examples given here are based on what I call a grid of size 3. That is a grid where the block is 3 x 3, and the entire grid is based on 3 x 3 blocks.

3 x 3 Block:
```
╔═══╤═══╤═══╗
║   │   │   ║
╟───┼───┼───╢
║   │   │   ║
╟───┼───┼───╢
║   │   │   ║
╚═══╧═══╧═══╝
```

3 x 3 Grid:
```
╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝
```
# The Algorithms
These algorithms will generally refer to just rows, though they will also be applied to columns.

## Fill A Row
If a row is missing a single digit, fill in the missing digit.

```
╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗
║ 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |   ║
╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝

becomes

╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗
║ 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 ║
╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝
```

## Fill a Block
If a block is missing a single digit, fill in the missing digit

```
╔═══╤═══╤═══╗
║ 1 │ 2 │ 3 ║
╟───┼───┼───╢
║ 4 │ 5 │ 6 ║
╟───┼───┼───╢
║ 7 │ 8 │   ║
╚═══╧═══╧═══╝

becomes

╔═══╤═══╤═══╗
║ 1 │ 2 │ 3 ║
╟───┼───┼───╢
║ 4 │ 5 │ 6 ║
╟───┼───┼───╢
║ 7 │ 8 │ 9 ║
╚═══╧═══╧═══╝
```

## Fill a Row of Blocks
```
╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗
║   │   │   ║ 1 │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │ 1 │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │ 2 │ 3 ║   │   │   ║   │   │   ║
╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝

becomes

╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗
║   │   │   ║ 1 │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │ 1 │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║ 1 │ 2 │ 3 ║   │   │   ║   │   │   ║
╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝
```

## Fill a Row by Exclusion
```
╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗
║ 1 │ 2 │ 3 ║ 4 │ 5 │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │ 7 ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣
║   │   │   ║   │   │ 8 ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │ 9 ║   │   │   ║
╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝

becomes

╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗
║ 1 │ 2 │ 3 ║ 4 │ 5 │ 6 ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │ 7 ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣
║   │   │   ║   │   │ 8 ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │ 9 ║   │   │   ║
╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
║   │   │   ║   │   │   ║   │   │   ║
╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝
```
