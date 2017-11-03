setwd("E:/TOTVS_DataChallenge")
data <- 'data/sample.txt'

library(jsonlite)
library(lubridate)
library(forecast)
library(ggplot2)

df <- fromJSON(data)
df$dt <- strptime(df$ide$dhEmi$`$date`, "%Y-%m-%dT%H:%M:%S", tz="Zulu")

df$mealtype = NA
df[hour(df$dt) >= 11 & hour(df$dt) < 17,]$mealtype <- 'Lunch'
df[hour(df$dt) >= 17,]$mealtype <- 'Dinner'

df.exp.daily <- aggregate(df$complemento$valorTotal ~ as.Date(df$dt)+df$mealtype, df, sum)
colnames(df.exp.daily) <- c('Date','MealType','TotalExp')
df.exp.daily$wday <- strftime(df.exp.daily$Date,'%A') 
df.exp.daily$wnum <- strftime(df.exp.daily$Date,'%W') 

ggplot(df.exp.daily, aes(x = Date, y = TotalExp, fill=MealType)) + geom_bar(stat="identity", position="dodge") 

#only lunch
df.exp.daily.lunch <-  df.exp.daily[df.exp.daily$MealType == 'Lunch',]
df.exp.daily.lunch$TotalExp <- ts(df.exp.daily.lunch$TotalExp,frequency=1)
fit <- auto.arima(df.exp.daily.lunch$TotalExp)
f<-forecast(fit,h=7)
autoplot(f)

#full
df.exp.daily.full <- aggregate(df.exp.daily$TotalExp ~ as.Date(df.exp.daily$Date), df.exp.daily, sum)
colnames(df.exp.daily.full) <- c('Date','TotalExp')
df.exp.daily.full$TotalExp <- ts(df.exp.daily.full$TotalExp,frequency=1)
fit1 <- auto.arima(df.exp.daily.full$TotalExp)
f1<-forecast(fit1,h=7)
autoplot(f1)







