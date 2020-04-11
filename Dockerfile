#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base

# Setup NodeJs
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq
# End setup

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq


WORKDIR /src
COPY ["GroceryShop.Angular/GroceryShop.Angular.csproj", "GroceryShop.Angular/"]
COPY ["GroceryShop.Repositorio/GroceryShop.Repositorio.csproj", "GroceryShop.Repositorio/"]
COPY ["GroceryShop.Dominio/GroceryShop.Dominio.csproj", "GroceryShop.Dominio/"]
RUN dotnet restore "GroceryShop.Angular/GroceryShop.Angular.csproj"
COPY . .
WORKDIR "/src/GroceryShop.Angular"
RUN dotnet build "GroceryShop.Angular.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GroceryShop.Angular.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GroceryShop.Angular.dll"]